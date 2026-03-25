<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;
    protected $fillable = ['total_price', 'status', 'user_id'];
    protected $table = 'orders';
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_products')->withPivot('quantity', 'unit_price')->withTimestamps();
    }
    public function isMine($user)
    {
        return $this->user_id === $user->id;
    }
}
