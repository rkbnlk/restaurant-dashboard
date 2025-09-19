<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\OrderController;

Route::prefix('api')->group(function () {

    Route::get('/restaurants', [RestaurantController::class, 'index']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/restaurant/{id}/trends', [OrderController::class, 'trends']);
    Route::get('/top-restaurants', [RestaurantController::class, 'topRestaurants']);

});
