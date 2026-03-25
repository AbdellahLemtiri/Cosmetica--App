<?php

namespace App\Services;

use App\DAOs\OrderDAO;
use App\DTOs\OrderDTO;
use App\Models\Order;
use Exception;
use Illuminate\Support\Facades\Log;

class OrderService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected OrderDAO $orderDAO)
    {
        //
    }

    public function placeOrder(OrderDTO $dto)
    {
        try {
            $order = $this->orderDAO->create($dto);

            Log::info("Order created successfully: " . $order->id);

            return $order;
        } catch (Exception $e) {
            throw new Exception("Failed to create order: " . $e->getMessage());
        }
    }

    // Method to send order notification
    protected function sendOrderNotification(Order $order, string $message)
    {
        Log::info($message);
    }


    public function updateOrderStatus(int $orderId, string $status)
    {
        $order = $this->orderDAO->updateStatus($orderId, $status);

        if ($status === 'completed') {
            $this->sendOrderNotification($order, "Your order has been completed!");
        }

        return $order;
    }

    public function cancelOrder(int $orderId, int $userId): bool
    {
        $order = Order::findOrFail($orderId);

        if ($order->user_id !== $userId) {
            throw new Exception('You are not authorized to cancel this order.');
        }

        return $this->orderDAO->cancelOrder($orderId);
    }

    public function getOrderDetails(int $orderId)
    {
        return  $this->orderDAO->getOrderDetails($orderId);
    }
}
