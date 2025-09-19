<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestaurantController extends Controller
{
    public function index()
    {
        return response()->json(Restaurant::all());
    }

    public function topRestaurants()
    {
        $topRestaurants = DB::table('restaurants')
            ->join('orders', 'orders.restaurant_id', '=', 'restaurants.id')
            ->select(
                'restaurants.id',
                'restaurants.name',
                'restaurants.location',
                'restaurants.cuisine',
                DB::raw('SUM(orders.order_amount) as revenue')
            )
            ->groupBy('restaurants.id', 'restaurants.name', 'restaurants.location', 'restaurants.cuisine')
            ->orderByDesc('revenue')
            ->limit(3)
            ->get();

        return response()->json($topRestaurants);
    }
}
