<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisteRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisteRequest $request)
    {

        $data = $request->validated();
        $user = User::create($data);
        $token = Auth::guard('api')->login($user);
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        if (! $token = Auth::guard('api')->attempt($data)) {
            return response()->json(['error' => 'Email ou mot de passe incorrect'], 401);
        }

        return response()->json([
            'user' => Auth::guard('api')->user(),
            'token' => $token
        ], 200);
    }

    public function logout()
    {
        Auth::guard('api')->logout();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ], 200);
    }
}
