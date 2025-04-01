<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use League\Csv\Reader;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the participants.
     */
    public function index()
    {
        $user = Auth::user();
        $cooperative = $user->cooperative;

        if (!$cooperative) {
            return redirect()->route('dashboard')->with('error', 'Please set up your cooperative first.');
        }

        $participants = Participant::where('cooperative_id', $cooperative->id)
                                   ->orderBy('name')
                                   ->paginate(20);

        return Inertia::render('Participants/Index', [
            'participants' => $participants,
        ]);
    }

    /**
     * Show the form for creating a new participant.
     */
    public function create()
    {
        $user = Auth::user();
        $cooperative = $user->cooperative;

        if (!$cooperative) {
            return redirect()->route('dashboard')->with('error', 'Please set up your cooperative first.');
        }

        return Inertia::render('Participants/Create', [
            'cooperative' => $cooperative,
        ]);
    }

    /**
     * Store a newly created participant in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $cooperative = $user->cooperative;

        if (!$cooperative) {
            return redirect()->route('dashboard')->with('error', 'Please set up your cooperative first.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'member_id' => 'nullable|string|max:50',
            'additional_info' => 'nullable|json',
        ]);

        // Check if participant with this email already exists for this cooperative
        $existingParticipant = Participant::where('email', $validated['email'])
                                          ->where('cooperative_id', $cooperative->id)
                                          ->first();

        if ($existingParticipant) {
            return redirect()->back()->with('error', 'A participant with this email already exists.');
        }

        $participant = new Participant([
            'cooperative_id' => $cooperative->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'member_id' => $validated['member_id'],
            'additional_info' => $validated['additional_info'],
            'active' => true,
        ]);

        $participant->save();

        return redirect()->route('participants.index')->with('success', 'Participant created successfully.');
    }

    /**
     * Display the specified participant.
     */
    public function show(Participant $participant)
    {
        $user = Auth::user();
        $cooperative = $user->cooperative;

        if (!$cooperative || $participant->cooperative_id !== $cooperative->id) {
            return redirect()->route('participants.index')->with('error', 'You do not have permission to view this participant.');
        }

        // Load entries with raffle information
        $participant->load(['entries.raffle']);

        return Inertia::render('Participants/Show', [
            'participant' => $participant,
        ]);
    }

    /**
     * Show the form for editing the specified participant.
     */
    public function edit(Participant $participant)
    {
        $user = Auth::user();
        $cooperative = $user->cooperative;

        if (!$cooperative || $participant->cooperative_id !== $cooperative->id) {
            return redirect()->route('participants.index')->with('error', 'You do not have permission to edit this participant.');
        }

        return Inertia::render('Participants/Edit', [
            'participant' => $participant,
            'cooperative' => $cooperative,
        ]);
    }

    /**
     * Update the specified participant in storage.
     */
    public function update(Request $request, Participant $participant)
    {
        $user = Auth::user();
        $cooperative = $user->cooperative;

        if (!$cooperative || $participant->cooperative_id !== $cooperative->id) {
            return redirect()->route('participants.index')->with('error', 'You do not have permission to edit this participant.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'member_id' => 'nullable|string|max:50',
            'additional_info' => 'nullable|json',
            'active' => 'boolean',
        ]);

        // Check if email is being changed and already exists for another participant
        if ($validated['email'] !== $participant->email) {
            $existingParticipant = Participant::where('email', $validated['email'])
                                              ->where('cooperative_id', $cooperative->id)
                                              ->where('id', '!=', $participant->id)
                                              ->first();

            if ($existingParticipant) {
                return redirect()->back()->with('error', 'A participant with this email already exists.');
            }
        }

        $participant->update($validated);

        return redirect()->route('participants.index')->with('success', 'Participant updated successfully.');
    }

    /**
     * Remove the specified participant from storage.
     */
    public function destroy(Participant $participant)
    {
        $user = Auth::user();
        $cooperative = $user->cooperative;

        if (!$cooperative || $participant->cooperative_id !== $cooperative->id) {
            return redirect()->route('participants.index')->with('error', 'You do not have permission to delete this participant.');
        }

        // Check if participant has any entries
        if ($participant->entries()->exists()) {
            return redirect()->route('participants.index')->with('error', 'Cannot delete participant with raffle entries. You can mark them as inactive instead.');
        }

        $participant->delete();

        return redirect()->route('participants.index')->with('success', 'Participant deleted successfully.');
    }

    /**
     * Show the import form
     */
    public function importForm()
    {
        $user = Auth::user();
        $cooperative = $user->cooperative;

        if (!$cooperative) {
            return redirect()->route('dashboard')->with('error', 'Please set up your cooperative first.');
        }

        return Inertia::render('Participants/Import', [
            'cooperative' => $cooperative,
        ]);
    }

    /**
     * Process the CSV import
     */
    public function import(Request $request)
    {
        $user = Auth::user();
        $cooperative = $user->cooperative;

        if (!$cooperative) {
            return redirect()->route('dashboard')->with('error', 'Please set up your cooperative first.');
        }

        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        try {
            $file = $request->file('csv_file');
            $csv = Reader::createFromPath($file->getPathname(), 'r');
            $csv->setHeaderOffset(0);

            $records = $csv->getRecords();
            $successCount = 0;
            $errorCount = 0;
            $errors = [];

            foreach ($records as $offset => $record) {
                // Validate required fields
                if (empty($record['name']) || empty($record['email'])) {
                    $errors[] = "Row " . ($offset + 2) . ": Name and email are required.";
                    $errorCount++;
                    continue;
                }

                try {
                    // Check if participant already exists
                    $existingParticipant = Participant::where('email', $record['email'])
                                                      ->where('cooperative_id', $cooperative->id)
                                                      ->first();

                    if ($existingParticipant) {
                        // Update existing participant
                        $existingParticipant->update([
                            'name' => $record['name'],
                            'phone' => $record['phone'] ?? $existingParticipant->phone,
                            'member_id' => $record['member_id'] ?? $existingParticipant->member_id,
                            'active' => true,
                        ]);
                    } else {
                        // Create new participant
                        Participant::create([
                            'cooperative_id' => $cooperative->id,
                            'name' => $record['name'],
                            'email' => $record['email'],
                            'phone' => $record['phone'] ?? null,
                            'member_id' => $record['member_id'] ?? null,
                            'active' => true,
                        ]);
                    }

                    $successCount++;
                } catch (\Exception $e) {
                    $errors[] = "Row " . ($offset + 2) . ": " . $e->getMessage();
                    $errorCount++;
                }
            }

            return redirect()->route('participants.index')->with([
                'success' => "Import completed: {$successCount} participants processed successfully.",
                'warning' => $errorCount > 0 ? "{$errorCount} errors encountered." : null,
                'importErrors' => $errors
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error processing CSV file: ' . $e->getMessage());
        }
    }
}
