<?php
// app/Http/Controllers/RaffleController.php
namespace App\Http\Controllers;

use App\Models\Raffle;
use App\Models\Prize;
use App\Models\Winner;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RaffleController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $cooperative = $user->cooperative;

        $raffles = Raffle::where('cooperative_id', $cooperative->id)
                         ->orderBy('created_at', 'desc')
                         ->paginate(10);

        return Inertia::render('Raffles/Index', [
            'raffles' => $raffles
        ]);
    }

    public function create()
    {
        return Inertia::render('Raffles/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'draw_date' => 'nullable|date|after_or_equal:end_date',
            'max_entries_per_participant' => 'required|integer|min:1',
            'is_public' => 'boolean',
            'access_code' => 'nullable|string|max:50',
        ]);

        $user = auth()->user();
        $cooperative = $user->cooperative;

        $raffle = new Raffle([
            'cooperative_id' => $cooperative->id,
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title'] . '-' . uniqid()),
            'description' => $validated['description'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'draw_date' => $validated['draw_date'],
            'max_entries_per_participant' => $validated['max_entries_per_participant'],
            'is_public' => $validated['is_public'],
            'access_code' => $validated['is_public'] ? null : $validated['access_code'],
            'status' => 'draft',
        ]);

        $raffle->save();

        return redirect()->route('raffles.edit', $raffle->id);
    }

    public function show(Raffle $raffle)
    {
//        $this->authorize('view', $raffle);

        $raffle->load(['prizes', 'entries.participant']);

        $winnerCount = $raffle->winners()->count();
        $entryCount = $raffle->entries()->count();
        $participantCount = $raffle->entries()->distinct('participant_id')->count();

        return Inertia::render('Raffles/Show', [
            'raffle' => $raffle,
            'prizes' => $raffle->prizes,
            'stats' => [
                'winner_count' => $winnerCount,
                'entry_count' => $entryCount,
                'participant_count' => $participantCount,
            ]
        ]);
    }

    public function edit(Raffle $raffle)
    {
//        $this->authorize('update', $raffle);

        $raffle->load('prizes');

        return Inertia::render('Raffles/Edit', [
            'raffle' => $raffle,
            'prizes' => $raffle->prizes,
        ]);
    }

    public function update(Request $request, Raffle $raffle)
    {
//        $this->authorize('update', $raffle);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'draw_date' => 'nullable|date|after_or_equal:end_date',
            'max_entries_per_participant' => 'required|integer|min:1',
            'is_public' => 'boolean',
            'access_code' => 'nullable|string|max:50',
            'status' => 'required|in:draft,published,completed,cancelled',
        ]);

        $raffle->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'draw_date' => $validated['draw_date'],
            'max_entries_per_participant' => $validated['max_entries_per_participant'],
            'is_public' => $validated['is_public'],
            'access_code' => $validated['is_public'] ? null : $validated['access_code'],
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with('success', 'Raffle updated successfully.');
    }

    public function destroy(Raffle $raffle)
    {
//        $this->authorize('delete', $raffle);

        if ($raffle->entries()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete a raffle with entries.');
        }

        $raffle->prizes()->delete();
        $raffle->delete();

        return redirect()->route('raffles.index')->with('success', 'Raffle deleted successfully.');
    }

    public function draw(Raffle $raffle)
    {
//        $this->authorize('update', $raffle);

        // Make sure raffle is published and past end date
        if ($raffle->status !== 'published' || $raffle->end_date > now()) {
            return redirect()->back()->with('error', 'Raffle is not ready for drawing.');
        }

        $prizes = $raffle->prizes()->orderBy('order')->get();
        $validEntries = $raffle->entries()->where('is_valid', true)->get();

        if ($validEntries->isEmpty()) {
            return redirect()->back()->with('error', 'No valid entries for this raffle.');
        }

        if ($prizes->isEmpty()) {
            return redirect()->back()->with('error', 'No prizes defined for this raffle.');
        }

        foreach ($prizes as $prize) {
            // For each prize, draw the specified quantity of winners
            for ($i = 0; $i < $prize->quantity; $i++) {
                // Get entries that haven't won yet
                $availableEntries = $validEntries->reject(function ($entry) {
                    return $entry->winner()->exists();
                });

                if ($availableEntries->isEmpty()) {
                    return redirect()->back()->with('warning', 'Not enough entries to draw all prizes.');
                }

                // Randomly select a winner
                $winningEntry = $availableEntries->random();

                // Create winner record
                $winner = new Winner([
                    'raffle_id' => $raffle->id,
                    'prize_id' => $prize->id,
                    'raffle_entry_id' => $winningEntry->id,
                    'participant_id' => $winningEntry->participant_id,
                    'drawn_at' => now(),
                    'is_claimed' => false,
                ]);

                $winner->save();
            }
        }

        $raffle->update(['status' => 'completed']);

        return redirect()->route('raffles.winners', $raffle->id)->with('success', 'Raffle draw completed successfully.');
    }

    public function winners(Raffle $raffle)
    {
//        $this->authorize('view', $raffle);

        $winners = $raffle->winners()->with(['prize', 'participant', 'raffleEntry'])->get();

        return Inertia::render('Raffles/Winners', [
            'raffle' => $raffle,
            'winners' => $winners,
        ]);
    }
}

