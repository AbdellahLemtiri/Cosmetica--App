<?php

namespace App\Services;

use App\DTOs\RegisterDTO;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function registerUser(RegisterDTO $dto): User
    {
        $user = User::create([
            'name' => $dto->name,
            'email' => $dto->email,
            'password' => Hash::make($dto->password),
        ]);

        $user->assignRole($dto->role);
        return $user;
    }
    public function login(array $dataLogin): ?string
    {
        return auth('api')->attempt($dataLogin);
    }
}
