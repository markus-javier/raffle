<?php

namespace App\Http\Controllers;

use App\Models\Cooperative;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CooperativeController extends Controller
{
    /**
     * Show the form for creating a new cooperative.
     */
    public function create()
    {
        return Inertia::render('Dashboard/SetupCooperative');
    }

    /**
     * Store a newly created cooperative in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'primary_color' => 'required|string|max:20',
            'secondary_color' => 'required|string|max:20',
        ]);

        $user = Auth::user();

        // Check if user already has a cooperative
        if ($user->cooperative) {
            return redirect()->route('dashboard')->with('error', 'You already have a cooperative set up.');
        }

        // Create the cooperative
        $cooperative = Cooperative::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name'] . '-' . uniqid()),
            'description' => $validated['description'],
            'primary_color' => $validated['primary_color'],
            'secondary_color' => $validated['secondary_color'],
        ]);

        // Process logo if uploaded
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('cooperatives', 'public');
            $cooperative->update(['logo' => $path]);
        }

        return redirect()->route('dashboard')->with('success', 'Cooperative set up successfully!');
    }

    /**
     * Show the settings page for editing the cooperative.
     */
    public function edit()
    {
        $user = Auth::user();
        $cooperative = $user->cooperative;

        if (!$cooperative) {
            return redirect()->route('dashboard')->with('error', 'No cooperative found. Please set up your cooperative first.');
        }

        return Inertia::render('Settings/Index', [
            'cooperative' => $cooperative,
        ]);
    }

    /**
     * Update the specified cooperative in storage.
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        $cooperative = $user->cooperative;

        if (!$cooperative) {
            return redirect()->route('dashboard')->with('error', 'No cooperative found. Please set up your cooperative first.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'primary_color' => 'required|string|max:20',
            'secondary_color' => 'required|string|max:20',
        ]);

        $cooperative->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'primary_color' => $validated['primary_color'],
            'secondary_color' => $validated['secondary_color'],
        ]);

        // Process logo if uploaded
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('cooperatives', 'public');
            $cooperative->update(['logo' => $path]);
        }

        return redirect()->back()->with('success', 'Cooperative settings updated successfully!');
    }
}
