<?php

namespace App\Http\Controllers;

use App\DTOs\OrderDTO;
use App\Http\Requests\OrderRequest;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(
        protected OrderService $orderService
    ) {
        // 
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        try {
            $dto = OrderDTO::fromRequest($request);
            $order = $this->orderService->placeOrder($dto);

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }
    /**
     * Display the specified resource.
     */

    public function show(int $id)
    {
        $order = $this->orderService->getOrderDetails($id);
        return response()->json($order);
    }

    public function myOrders()
    {
        $orders = auth()->user()->orders()->with('products')->latest()->get();
        return response()->json($orders);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateStatus(Request $request, int $id)
    {
        if (!auth()->user()->hasAnyRole(['admin', 'employee'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled'
        ]);

        $order = $this->orderService->updateOrderStatus($id, $request->status);

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order
        ]);
    }

    /**
     * cancel the specified resource from storage.
     */
    public function cancel(int $id)
    {
        try {
            $userId = auth()->id();
            $this->orderService->cancelOrder($id, $userId);

            return response()->json(['message' => 'Order cancelled successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
