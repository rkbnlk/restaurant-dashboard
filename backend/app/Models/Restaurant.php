<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = ['id','name','location','cuisine'];
    public $incrementing = false; // IDs come from JSON
    protected $keyType = 'int';

    public function orders() {
        return $this->hasMany(Order::class);
    }
}
