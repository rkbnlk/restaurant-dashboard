<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['id','restaurant_id','order_amount','order_time'];
    public $incrementing = false; 
    protected $keyType = 'int';

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
