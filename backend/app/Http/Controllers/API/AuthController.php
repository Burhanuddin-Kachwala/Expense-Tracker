<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{  

public function register(RegisterRequest $request)
{
   
    $user = User::create([
        'name'     => $request->name,
        'email'    => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return ApiResponse::success([
        'user'  => $user,
        'token' => $token
    ], 'Registration successful.');
}

public function login(LoginRequest $request)
{
    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return ApiResponse::error('Invalid email or password.');
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return ApiResponse::success([
        'user'  => $user,
        'token' => $token
    ], 'Login successful.');
}
public function logout(Request $request)
{
    try {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();
        auth()->guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return ApiResponse::success([], 'Logged out successfully.');
    } catch (\Exception $e) {
        return ApiResponse::error('Logout failed: ' . $e->getMessage());
    }
}

}
