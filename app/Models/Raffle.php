<?php

// app/Models/Raffle.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Raffle extends Model
{
    use HasFactory;

    protected $fillable = [
        'cooperative_id',
        'title',
        'slug',
        'description',
        'start_date',
        'end_date',
        'draw_date',
        'status',
        'max_entries_per_participant',
        'is_public',
        'access_code',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'draw_date' => 'datetime',
        'is_public' => 'boolean',
    ];

    public function cooperative(): BelongsTo
    {
        return $this->belongsTo(Cooperative::class);
    }

    public function prizes(): HasMany
    {
        return $this->hasMany(Prize::class);
    }

    public function entries(): HasMany
    {
        return $this->hasMany(RaffleEntry::class);
    }

    public function winners(): HasMany
    {
        return $this->hasMany(Winner::class);
    }
}
