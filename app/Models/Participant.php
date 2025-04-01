<?php

// app/Models/Participant.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Participant extends Model
{
    use HasFactory;

    protected $fillable = [
        'cooperative_id',
        'name',
        'email',
        'phone',
        'member_id',
        'additional_info',
        'active',
    ];

    protected $casts = [
        'additional_info' => 'array',
        'active' => 'boolean',
    ];

    public function cooperative(): BelongsTo
    {
        return $this->belongsTo(Cooperative::class);
    }

    public function entries(): HasMany
    {
        return $this->hasMany(RaffleEntry::class);
    }

    public function wins(): HasMany
    {
        return $this->hasMany(Winner::class);
    }
}
