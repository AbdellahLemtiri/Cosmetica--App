<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getDashboardStats()
    {
        $totalRevenue = DB::table('orders')
            ->where('status', 'completed')
            ->sum('total_price');

        $topProducts = DB::table('order_products')
            ->join('products', 'order_products.product_id', '=', 'products.id')
            ->select('products.name', DB::raw('SUM(order_products.quantity) as total_sold'))
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        $categoryDistribution = DB::table('categories')
            ->leftJoin('products', 'categories.id', '=', 'products.category_id')
            ->select('categories.name', DB::raw('COUNT(products.id) as products_count'))
            ->groupBy('categories.id', 'categories.name')
            ->get();

        $orderStatus = DB::table('orders')
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        return response()->json([
            'stats' => [
                'total_revenue' => (float) $totalRevenue,
                'top_products' => $topProducts,
                'category_distribution' => $categoryDistribution,
                'order_status_summary' => $orderStatus
            ]
        ]);
    }
}
