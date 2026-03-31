<?php

namespace App\Http\Controllers;

use App\DTOs\RegisterDTO;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\auth\LoginResource;
use App\Services\AuthService;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {
        // 
    }

    public function register(RegisterRequest $request)
    {
        $dto = RegisterDTO::fromRequest($request);
        $user = $this->authService->registerUser($dto);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user->load('roles'),
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $token = $this->authService->login($request->validated());

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth('api')->user()->load('roles');


        return response()->json([
            'user' => $user,
            'token' => $token, 
            'message' => 'Successfully logged in'
        ]);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
