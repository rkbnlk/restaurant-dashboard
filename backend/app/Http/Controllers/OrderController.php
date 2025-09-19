<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::all());
    }

    public function trends($restaurant_id, Request $request)
    {
        $from = $request->query('from');
        $to = $request->query('to');
        
        if ($to) {
            $to = \Carbon\Carbon::parse($to)->addDay()->toDateString();
        }

        $query = Order::where('restaurant_id', $restaurant_id)
            ->when($from && $to, fn($q) => $q->whereBetween('order_time', [$from, $to]));

        $orders = $query->get();

        $dailyOrders = $orders->groupBy(fn($o) => substr($o->order_time, 0, 10))
            ->map(fn($dayOrders) => [
                'count' => $dayOrders->count(),
                'revenue' => $dayOrders->sum('order_amount'),
                'avg_order_value' => intval($dayOrders->avg('order_amount')),
                'peak_hour' => collect($dayOrders)
                    ->groupBy(fn($o) => substr($o->order_time, 11, 2))
                    ->sortByDesc(fn($h) => count($h))
                    ->keys()
                    ->first(),
            ]);

        return response()->json($dailyOrders);
    }
}
