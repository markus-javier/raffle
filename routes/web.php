<?php
// routes/web.php
require __DIR__.'/auth.php';

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RaffleController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\PrizeController;
use App\Http\Controllers\RaffleEntryController;
use App\Http\Controllers\WinnerController;
use App\Http\Controllers\CooperativeController;
use App\Http\Controllers\PublicRaffleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Public raffle routes
Route::get('/raffle/{slug}', [PublicRaffleController::class, 'show'])->name('public.raffle.show');
Route::get('/raffle/{slug}/enter', [PublicRaffleController::class, 'enterForm'])->name('public.raffle.enter');
Route::post('/raffle/{slug}/submit', [PublicRaffleController::class, 'submitEntry'])->name('raffle.enter');

// Protected routes
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Cooperative
    Route::post('/cooperatives', [CooperativeController::class, 'store'])->name('cooperatives.store');
    Route::put('/cooperatives/{cooperative}', [CooperativeController::class, 'update'])->name('cooperatives.update');
    Route::get('/settings', [CooperativeController::class, 'edit'])->name('settings');

    // Raffles
    Route::get('/raffles', [RaffleController::class, 'index'])->name('raffles.index');
    Route::get('/raffles/create', [RaffleController::class, 'create'])->name('raffles.create');
    Route::post('/raffles', [RaffleController::class, 'store'])->name('raffles.store');
    Route::get('/raffles/{raffle}', [RaffleController::class, 'show'])->name('raffles.show');
    Route::get('/raffles/{raffle}/edit', [RaffleController::class, 'edit'])->name('raffles.edit');
    Route::put('/raffles/{raffle}', [RaffleController::class, 'update'])->name('raffles.update');
    Route::delete('/raffles/{raffle}', [RaffleController::class, 'destroy'])->name('raffles.destroy');
    Route::post('/raffles/{raffle}/draw', [RaffleController::class, 'draw'])->name('raffles.draw');
    Route::get('/raffles/{raffle}/winners', [RaffleController::class, 'winners'])->name('raffles.winners');
    Route::get('/raffles/{raffle}/entries', [RaffleEntryController::class, 'index'])->name('raffles.entries');

    // Prizes
    Route::get('/raffles/{raffle}/prizes/create', [PrizeController::class, 'create'])->name('raffles.prizes.create');
    Route::post('/raffles/{raffle}/prizes', [PrizeController::class, 'store'])->name('raffles.prizes.store');
    Route::get('/prizes/{prize}/edit', [PrizeController::class, 'edit'])->name('prizes.edit');
    Route::put('/prizes/{prize}', [PrizeController::class, 'update'])->name('prizes.update');
    Route::delete('/prizes/{prize}', [PrizeController::class, 'destroy'])->name('prizes.destroy');

    // Participants
    Route::get('/participants', [ParticipantController::class, 'index'])->name('participants.index');
    Route::get('/participants/create', [ParticipantController::class, 'create'])->name('participants.create');
    Route::post('/participants', [ParticipantController::class, 'store'])->name('participants.store');
    Route::get('/participants/{participant}', [ParticipantController::class, 'show'])->name('participants.show');
    Route::get('/participants/{participant}/edit', [ParticipantController::class, 'edit'])->name('participants.edit');
    Route::put('/participants/{participant}', [ParticipantController::class, 'update'])->name('participants.update');
    Route::delete('/participants/{participant}', [ParticipantController::class, 'destroy'])->name('participants.destroy');
    Route::post('/participants/import', [ParticipantController::class, 'import'])->name('participants.import');

    // Winners
    Route::put('/winners/{winner}/claim', [WinnerController::class, 'markAsClaimed'])->name('winners.claim');

    // Raffle Entries
    Route::get('/raffles/{raffle}/entries', [RaffleEntryController::class, 'index'])->name('raffles.entries');
    Route::get('/raffles/{raffle}/entries/create', [RaffleEntryController::class, 'create'])->name('raffles.entries.create');
    Route::post('/raffles/{raffle}/entries', [RaffleEntryController::class, 'store'])->name('raffles.entries.store');
    Route::get('/raffles/{raffle}/entries/import', [RaffleEntryController::class, 'importForm'])->name('raffles.entries.import');
    Route::post('/raffles/{raffle}/entries/import', [RaffleEntryController::class, 'importProcess'])->name('raffles.entries.import.process');
    Route::put('/entries/{entry}/invalidate', [RaffleEntryController::class, 'invalidate'])->name('entries.invalidate');
    Route::put('/entries/{entry}/validate', [RaffleEntryController::class, 'validate'])->name('entries.validate');
});
