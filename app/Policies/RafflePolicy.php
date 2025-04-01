<?php

namespace App\Policies;

use App\Models\Raffle;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RafflePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Raffle $raffle)
    {
        return $user->cooperative && $raffle->cooperative_id === $user->cooperative->id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Raffle $raffle)
    {
        return $user->cooperative && $raffle->cooperative_id === $user->cooperative->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Raffle $raffle)
    {
        return $user->cooperative && $raffle->cooperative_id === $user->cooperative->id;
    }
}
