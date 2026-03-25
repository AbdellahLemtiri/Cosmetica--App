<?php

namespace Database\Factories;

use App\Models\Model;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Model>
 */
class OrderProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "order_id" => Order::factory(),
            "product_id" => Product::factory(),
            "quantity" => $this->faker->numberBetween(1, 10),
            "unit_price" => $this->faker->randomFloat(2, 5, 100),

        ];
    }
}
