<?php

namespace App\Http\Controllers;

use App\Models\Prize;
use App\Models\Raffle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrizeController extends Controller
{
    /**
     * Show the form for creating a new prize.
     */
    public function create(Raffle $raffle)
    {
        // $this->authorize('update', $raffle);

        return Inertia::render('Prizes/Create', [
            'raffle' => $raffle
        ]);
    }

    /**
     * Store a newly created prize in storage.
     */
    public function store(Request $request, Raffle $raffle)
    {
        // $this->authorize('update', $raffle);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:1024',
            'quantity' => 'required|integer|min:1',
            'order' => 'required|integer|min:1',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('prizes', 'public');
        }

        $prize = new Prize([
            'raffle_id' => $raffle->id,
            'name' => $validated['name'],
            'description' => $validated['description'],
            'image' => $imagePath,
            'quantity' => $validated['quantity'],
            'order' => $validated['order'],
        ]);

        $prize->save();

        return redirect()->route('raffles.edit', $raffle->id)->with('success', 'Prize added successfully.');
    }

    /**
     * Show the form for editing the specified prize.
     */
    public function edit(Prize $prize)
    {
        // $this->authorize('update', $prize->raffle);

        return Inertia::render('Prizes/Edit', [
            'prize' => $prize,
            'raffle' => $prize->raffle
        ]);
    }

    /**
     * Update the specified prize in storage.
     */
    public function update(Request $request, Prize $prize)
    {
        // $this->authorize('update', $prize->raffle);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:1024',
            'quantity' => 'required|integer|min:1',
            'order' => 'required|integer|min:1',
        ]);

        $data = [
            'name' => $validated['name'],
            'description' => $validated['description'],
            'quantity' => $validated['quantity'],
            'order' => $validated['order'],
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('prizes', 'public');
        }

        $prize->update($data);

        return redirect()->route('raffles.edit', $prize->raffle_id)->with('success', 'Prize updated successfully.');
    }

    /**
     * Remove the specified prize from storage.
     */
    public function destroy(Prize $prize)
    {
        // $this->authorize('update', $prize->raffle);

        if ($prize->winners()->exists()) {
            return redirect()->back()->with('error', 'Cannot delete a prize that has winners.');
        }

        $raffleId = $prize->raffle_id;
        $prize->delete();

        return redirect()->route('raffles.edit', $raffleId)->with('success', 'Prize deleted successfully.');
    }
}
