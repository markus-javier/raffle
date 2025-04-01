<?php
// app/Models/RaffleEntry.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RaffleEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'raffle_id',
        'participant_id', // Now optional
        'entrant_name',   // New field
        'ticket_number',
        'is_valid',
    ];

    protected $casts = [
        'is_valid' => 'boolean',
    ];

    public function raffle(): BelongsTo
    {
        return $this->belongsTo(Raffle::class);
    }

    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }

    public function winner(): HasOne
    {
        return $this->hasOne(Winner::class);
    }
}
