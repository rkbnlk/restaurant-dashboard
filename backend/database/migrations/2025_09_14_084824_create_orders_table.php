<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary(); // same as JSON "id"
            $table->unsignedBigInteger('restaurant_id')->index();
            $table->decimal('order_amount', 10, 2); // matches "order_amount"
            $table->timestamp('order_time')->index(); // matches "order_time"
            $table->timestamps();

            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
