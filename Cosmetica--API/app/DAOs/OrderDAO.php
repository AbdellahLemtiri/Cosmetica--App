<?php

namespace App\DAOs;

use App\DTOs\OrderDTO;
use App\Models\Order;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\DB;

class OrderDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create(OrderDTO $dto): Order
    {
        return DB::transaction(function () use ($dto) {
            $totalPrice = 0;
            $orderItems = [];

            foreach ($dto->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    throw new Exception("Not enough stock for {$product->name}");
                }

                $unitPrice = $product->price;
                $totalPrice += $unitPrice * $item['quantity'];

                $orderItems[$product->id] = [
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice
                ];

                $product->decrement('stock', $item['quantity']);
            }

            $order = Order::create([
                'user_id' => $dto->user_id,
                'total_price' => $totalPrice,
                'status' => 'pending'
            ]);

            $order->products()->attach($orderItems);

            return $order->load('products');
        });
    }
    /**
     * Update the status of the order.
     *
     * @param int $id
     * @param string $status
     * @return Order
     */
    public function updateStatus(int $id, string $status): Order
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => $status]);
        return $order;
    }
    public function cancelOrder(int $id): bool
    {
        return DB::transaction(function () use ($id) {
            $order = Order::with('products')->findOrFail($id);

            if ($order->status !== 'pending') {
                throw new Exception("Order is already {$order->status}");
            }

            foreach ($order->products as $product) {
                $product->increment('stock', $product->pivot->quantity);
            }

            return $order->update(['status' => 'cancelled']);
        });
    }

    public function getOrderDetails(int $id): Order
    {
        return Order::with('products')->findOrFail($id);
    }
}
