<?php

namespace App\Http\Controllers;

use App\Models\Raffle;
use App\Models\Participant;
use App\Models\RaffleEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PublicRaffleController extends Controller
{
    /**
     * Display the public raffle page.
     */
    public function show($slug)
    {
        $raffle = Raffle::where('slug', $slug)
                        ->where(function ($query) {
                            $query->where('status', 'published')
                                  ->orWhere('status', 'completed');
                        })
                        ->with(['prizes', 'cooperative'])
                        ->firstOrFail();

        $entryCount = RaffleEntry::where('raffle_id', $raffle->id)->count();
        $isEnded = now() > $raffle->end_date;
        $isDrawn = $raffle->status === 'completed';

        return Inertia::render('Public/RaffleShow', [
            'raffle' => $raffle,
            'cooperative' => $raffle->cooperative,
            'prizes' => $raffle->prizes,
            'entryCount' => $entryCount,
            'isEnded' => $isEnded,
            'isDrawn' => $isDrawn,
        ]);
    }

    /**
     * Display the raffle entry form.
     */
    public function enterForm($slug)
    {
        $raffle = Raffle::where('slug', $slug)
                        ->where('status', 'published')
                        ->where('end_date', '>', now())
                        ->with('cooperative')
                        ->firstOrFail();

        return Inertia::render('Public/RaffleEntry', [
            'raffle' => $raffle,
            'cooperative' => $raffle->cooperative,
        ]);
    }

    /**
     * Process a raffle entry submission.
     */
    public function submitEntry(Request $request, $slug)
    {
        $raffle = Raffle::where('slug', $slug)
                        ->where('status', 'published')
                        ->where('end_date', '>', now())
                        ->firstOrFail();

        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'member_id' => 'nullable|string|max:50',
            'access_code' => $raffle->is_public ? 'nullable|string' : 'required|string|in:' . $raffle->access_code,
            'num_entries' => 'required|integer|min:1|max:' . $raffle->max_entries_per_participant,
        ]);

        // Find or create the participant
        $participant = Participant::firstOrCreate(
            ['email' => $validated['email'], 'cooperative_id' => $raffle->cooperative_id],
            [
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'member_id' => $validated['member_id'],
                'cooperative_id' => $raffle->cooperative_id,
                'active' => true,
            ]
        );

        // Check if participant already has entries in this raffle
        $existingEntries = RaffleEntry::where('raffle_id', $raffle->id)
                                      ->where('participant_id', $participant->id)
                                      ->count();

        // Check if adding these entries would exceed the maximum
        $numEntries = $validated['num_entries'];
        if ($existingEntries + $numEntries > $raffle->max_entries_per_participant) {
            $remainingEntries = $raffle->max_entries_per_participant - $existingEntries;
            if ($remainingEntries <= 0) {
                return redirect()->back()->with('error', 'You have already used all your entries for this raffle.');
            }
            $numEntries = $remainingEntries;
        }

        // Create the entries
        for ($i = 0; $i < $numEntries; $i++) {
            // Generate a unique ticket number
            do {
                $ticketNumber = strtoupper(Str::random(8));
                $exists = RaffleEntry::where('ticket_number', $ticketNumber)->exists();
            } while ($exists);

            RaffleEntry::create([
                'raffle_id' => $raffle->id,
                'participant_id' => $participant->id,
                'ticket_number' => $ticketNumber,
                'is_valid' => true,
            ]);
        }

        return redirect()->route('public.raffle.show', $raffle->slug)->with('success', 'Your entries have been submitted successfully!');
    }
}
