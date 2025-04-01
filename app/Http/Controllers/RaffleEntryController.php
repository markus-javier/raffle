<?php

namespace App\Http\Controllers;

use App\Models\Raffle;
use App\Models\Participant;
use App\Models\RaffleEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use League\Csv\Reader;

class RaffleEntryController extends Controller
{
    /**
     * Display a listing of the entries for a raffle.
     */
    public function index(Raffle $raffle)
    {
        // $this->authorize('view', $raffle);

        $entries = RaffleEntry::where('raffle_id', $raffle->id)
                              ->with('participant')
                              ->orderBy('created_at', 'desc')
                              ->paginate(20);

        return Inertia::render('Raffles/Entries', [
            'raffle' => $raffle,
            'entries' => $entries,
        ]);
    }

    /**
     * Show the form for creating a new raffle entry.
     */
    public function create(Raffle $raffle)
    {
        // $this->authorize('update', $raffle);

        $participants = Participant::where('cooperative_id', $raffle->cooperative_id)
                                   ->orderBy('name')
                                   ->get();

        return Inertia::render('Entries/Create', [
            'raffle' => $raffle,
            'participants' => $participants,
        ]);
    }

    public function store(Request $request, Raffle $raffle)
    {
//        $this->authorize('update', $raffle);

        // Simplify validation - just require a name now
        $validated = $request->validate([
            'entrant_name' => 'required|string|max:255',
            'participant_id' => 'nullable|exists:participants,id',
            'num_entries' => "required|integer|min:1|max:{$raffle->max_entries_per_participant}",
        ]);

        $numEntries = $validated['num_entries'];
        $participantId = $validated['participant_id'] ?? null;

        // Create the entries
        for ($i = 0; $i < $numEntries; $i++) {
            // Generate a unique ticket number
            do {
                $ticketNumber = strtoupper(Str::random(8));
                $exists = RaffleEntry::where('ticket_number', $ticketNumber)->exists();
            } while ($exists);

            RaffleEntry::create([
                'raffle_id' => $raffle->id,
                'participant_id' => $participantId,
                'entrant_name' => $validated['entrant_name'],
                'ticket_number' => $ticketNumber,
                'is_valid' => true,
            ]);
        }

        return redirect()->route('raffles.entries', $raffle->id)->with('success', 'Entry added successfully.');
    }

    /**
     * Show the CSV import form
     */
    public function importForm(Raffle $raffle)
    {
        // $this->authorize('update', $raffle);

        return Inertia::render('Entries/Import', [
            'raffle' => $raffle,
        ]);
    }

    /**
     * Process the CSV import
     */
    public function importProcess(Request $request, Raffle $raffle)
    {
//        $this->authorize('update', $raffle);

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
                // Only require name in the CSV
                if (empty($record['name'])) {
                    $errors[] = "Row " . ($offset + 2) . ": Name is required.";
                    $errorCount++;
                    continue;
                }

                try {
                    // Create entry with just name
                    do {
                        $ticketNumber = strtoupper(Str::random(8));
                        $exists = RaffleEntry::where('ticket_number', $ticketNumber)->exists();
                    } while ($exists);

                    RaffleEntry::create([
                        'raffle_id' => $raffle->id,
                        'entrant_name' => $record['name'],
                        'ticket_number' => $ticketNumber,
                        'is_valid' => true,
                    ]);

                    $successCount++;
                } catch (\Exception $e) {
                    $errors[] = "Row " . ($offset + 2) . ": " . $e->getMessage();
                    $errorCount++;
                }
            }

            return redirect()->route('raffles.entries', $raffle->id)->with([
                'success' => "Import completed: {$successCount} entries processed successfully.",
                'warning' => $errorCount > 0 ? "{$errorCount} errors encountered." : null,
                'importErrors' => $errors
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error processing CSV file: ' . $e->getMessage());
        }
    }

    /**
     * Invalidate a raffle entry.
     */
    public function invalidate(Request $request, RaffleEntry $entry)
    {
        // $this->authorize('update', $entry->raffle);

        $entry->update(['is_valid' => false]);

        return redirect()->back()->with('success', 'Entry invalidated successfully.');
    }

    /**
     * Validate a raffle entry.
     */
    public function validate(Request $request, RaffleEntry $entry)
    {
        // $this->authorize('update', $entry->raffle);

        $entry->update(['is_valid' => true]);

        return redirect()->back()->with('success', 'Entry validated successfully.');
    }
}
