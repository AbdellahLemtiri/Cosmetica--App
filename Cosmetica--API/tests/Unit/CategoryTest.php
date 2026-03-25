<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\User;
use PHPUnit\Framework\TestCase;
use Spatie\Permission\Models\Role;

class CategoryTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function a_client_cannot_delete_a_category()
    {
        $role = Role::create(['name' => 'client', 'guard_name' => 'api']);
        $user = User::factory()->create();
        $user->assignRole($role);

        $category = Category::factory()->create();
    }
}
