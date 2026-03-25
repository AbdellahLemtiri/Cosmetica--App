<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(5)->create()->each(function ($user) {
            $orders = $user->orders()->saveMany(\App\Models\Order::factory()->count(3)->make());
            $orders->each(function ($order) {
                $products = Product::factory()->count(4)->create();
                $order->products()->attach($products->pluck('id')->toArray(), [
                    'quantity' => rand(1, 5),
                    'unit_price' => rand(10, 100),
                ]);
            });
        });
    }
}
