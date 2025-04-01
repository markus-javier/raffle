<?php

// app/Http/Controllers/DashboardController.php
namespace App\Http\Controllers;

use App\Models\Raffle;
use App\Models\Participant;
use App\Models\Winner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $cooperative = $user->cooperative;

        if (!$cooperative) {
            return Inertia::render('Dashboard/SetupCooperative');
        }

        $raffles = Raffle::where('cooperative_id', $cooperative->id)
                         ->orderBy('created_at', 'desc')
                         ->limit(5)
                         ->get();

        $totalRaffles = Raffle::where('cooperative_id', $cooperative->id)->count();
        $totalParticipants = Participant::where('cooperative_id', $cooperative->id)->count();
        $totalWinners = Winner::whereHas('raffle', function ($query) use ($cooperative) {
            $query->where('cooperative_id', $cooperative->id);
        })->count();

        $activeRaffles = Raffle::where('cooperative_id', $cooperative->id)
                               ->where('status', 'published')
                               ->whereDate('end_date', '>=', now())
                               ->count();

        return Inertia::render('Dashboard/Index', [
            'cooperative' => $cooperative,
            'raffles' => $raffles,
            'stats' => [
                'total_raffles' => $totalRaffles,
                'total_participants' => $totalParticipants,
                'total_winners' => $totalWinners,
                'active_raffles' => $activeRaffles,
            ]
        ]);
    }
}
