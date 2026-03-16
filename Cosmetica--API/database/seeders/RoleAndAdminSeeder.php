<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class RoleAndAdminSeeder extends Seeder
{
    public function run(): void
    {
         $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
        $employeeRole = Role::firstOrCreate(['name' => 'employee', 'guard_name' => 'api']);
        $clientRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);

         $admin = User::firstOrCreate(
            ['email' => 'admin@cosmetica.com'], 
            [
                'name' => 'Admin Cosmetica',
                'password' => 'password123',  
                'role' => 'admin' 
            ]
        );

         $admin->assignRole($adminRole);

         $client = User::firstOrCreate(
            ['email' => 'client@cosmetica.com'],
            [
                'name' => 'Client Normal',
                'password' => 'password123',
                'role' => 'user'
            ]
        );
        $client->assignRole($clientRole);
    }
}