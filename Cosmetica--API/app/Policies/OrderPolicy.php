<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['client', 'worker', 'admin', 'manager']);
    }

    public function view(User $user, Order $order): bool
    {
        return $user->hasAnyRole(['worker', 'admin', 'manager']) || $user->id === $order->user_id;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('client');
    }

    public function update(User $user, Order $order): bool
    {
        return $user->hasAnyRole(['worker', 'admin', 'manager']);
    }

    public function delete(User $user, Order $order): bool
    {
        return $user->hasRole('client') &&
            $order->user_id === $user->id &&
            $order->status === 'pending';
    }
}
