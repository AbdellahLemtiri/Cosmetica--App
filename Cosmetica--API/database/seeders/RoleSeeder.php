<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // ===== Permissions Produits =====
        Permission::create(['name' => 'products.view', 'guard_name' => 'api']);
        Permission::create(['name' => 'products.list', 'guard_name' => 'api']);
        Permission::create(['name' => 'products.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'products.update', 'guard_name' => 'api']);
        Permission::create(['name' => 'products.delete', 'guard_name' => 'api']);
        Permission::create(['name' => 'products.manage_images', 'guard_name' => 'api']);

        // ===== Permissions Catégories =====
        Permission::create(['name' => 'categories.view', 'guard_name' => 'api']);
        Permission::create(['name' => 'categories.list', 'guard_name' => 'api']);
        Permission::create(['name' => 'categories.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'categories.update', 'guard_name' => 'api']);
        Permission::create(['name' => 'categories.delete', 'guard_name' => 'api']);

        // ===== Permissions Commandes =====
        Permission::create(['name' => 'orders.place', 'guard_name' => 'api']);
        Permission::create(['name' => 'orders.view_own', 'guard_name' => 'api']);
        Permission::create(['name' => 'orders.cancel_own', 'guard_name' => 'api']);
        Permission::create(['name' => 'orders.view_all', 'guard_name' => 'api']);
        Permission::create(['name' => 'orders.update_status', 'guard_name' => 'api']);
        Permission::create(['name' => 'orders.manage', 'guard_name' => 'api']);

        // ===== Permissions Statistiques =====
        Permission::create(['name' => 'stats.view', 'guard_name' => 'api']);
        Permission::create(['name' => 'stats.products', 'guard_name' => 'api']);
        Permission::create(['name' => 'stats.categories', 'guard_name' => 'api']);

        // ===== Permissions Utilisateurs =====
        Permission::create(['name' => 'users.view', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.update', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.delete', 'guard_name' => 'api']);

        Permission::create(['name' => 'roles.manage', 'guard_name' => 'api']);

        // ===== ROLES =====

        // --- ADMIN ---
        $admin = Role::create(['name' => 'admin', 'guard_name' => 'api']);
        $admin->givePermissionTo(Permission::all());

        // --- MANAGER ---
        $manager = Role::create(['name' => 'manager', 'guard_name' => 'api']);
        $manager->givePermissionTo([
            'products.view',
            'products.list',
            'products.create',
            'products.update',
            'products.delete',
            'products.manage_images',
            'categories.view',
            'categories.list',
            'categories.create',
            'categories.update',
            'categories.delete',
            'orders.view_all',
            'orders.update_status',
            'stats.view',
            'stats.products',
            'stats.categories',
            'users.view',
        ]);

        // --- WORKER ---
        $worker = Role::create(['name' => 'worker', 'guard_name' => 'api']);
        $worker->givePermissionTo([
            'products.view',
            'products.list',
            'categories.view',
            'categories.list',
            'orders.view_all',
            'orders.update_status',
        ]);

        // --- CLIENT ---
        $client = Role::create(['name' => 'client', 'guard_name' => 'api']);
        $client->givePermissionTo([
            'products.view',
            'products.list',
            'categories.view',
            'categories.list',
            'orders.place',
            'orders.view_own',
            'orders.cancel_own',
        ]);
    }
}
