<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisteRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    public function register(RegisteRequest $request)
    {

        $data = $request->validated();
        $clientRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);
        $user = User::create($data);
        $user->assignRole($clientRole) ;
        $user->save();
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
