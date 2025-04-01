<?php
// app/Models/Winner.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Winner extends Model
{
    use HasFactory;

    protected $fillable = [
        'raffle_id',
        'prize_id',
        'raffle_entry_id',
        'participant_id',
        'drawn_at',
        'is_claimed',
        'claimed_at',
    ];

    protected $casts = [
        'drawn_at' => 'datetime',
        'is_claimed' => 'boolean',
        'claimed_at' => 'datetime',
    ];

    public function raffle(): BelongsTo
    {
        return $this->belongsTo(Raffle::class);
    }

    public function prize(): BelongsTo
    {
        return $this->belongsTo(Prize::class);
    }

    public function raffleEntry(): BelongsTo
    {
        return $this->belongsTo(RaffleEntry::class);
    }

    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }
}
