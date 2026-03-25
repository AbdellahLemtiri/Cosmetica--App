<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function a_user_can_login_and_receive_a_jwt_token()
    {
        $user = User::factory()->create([
            'email' => 'test@lacosmetica.com',
            'password' => bcrypt('password123'),
        ]);
    }
}
