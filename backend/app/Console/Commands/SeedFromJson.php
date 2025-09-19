<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Restaurant;
use App\Models\Order;

class SeedFromJson extends Command
{
    protected $signature = 'seed:from-json';
    protected $description = 'Seed restaurants and orders from JSON files in public/data';

    public function handle()
    {
        $this->info("Seeding data from JSON...");

        // --- Restaurants ---
        $restaurantsPath = public_path('data/restaurants.json');
        if (!file_exists($restaurantsPath)) {
            $this->error("❌ restaurants.json not found in public/data/");
            return;
        }

        $restaurantsJson = file_get_contents($restaurantsPath);
        $restaurants = json_decode($restaurantsJson, true);

        if (!is_array($restaurants)) {
            $this->error("❌ restaurants.json is not valid JSON array.");
            return;
        }

        foreach ($restaurants as $r) {
            Restaurant::updateOrCreate(
                ['id' => $r['id']],
                [
                    'name'     => $r['name'],
                    'location' => $r['location'],
                    'cuisine'  => $r['cuisine'],
                ]
            );
        }
        $this->info("✅ Seeded " . count($restaurants) . " restaurants.");

        // --- Orders ---
        $ordersPath = public_path('data/orders.json');
        if (!file_exists($ordersPath)) {
            $this->error("❌ orders.json not found in public/data/");
            return;
        }

        $ordersJson = file_get_contents($ordersPath);
        $orders = json_decode($ordersJson, true);

        if (!is_array($orders)) {
            $this->error("❌ orders.json is not valid JSON array.");
            return;
        }

        foreach ($orders as $o) {
            Order::updateOrCreate(
                ['id' => $o['id']],
                [
                    'restaurant_id' => $o['restaurant_id'],
                    'order_amount'  => $o['order_amount'],
                    'order_time'    => $o['order_time'],
                ]
            );
        }
        $this->info("✅ Seeded " . count($orders) . " orders.");

        $this->info("🎉 Done seeding data.");
    }
}
