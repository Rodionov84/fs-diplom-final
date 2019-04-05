<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CinemaHall extends Model
{
    protected  $table = "cinema_halls";

    protected $fillable = [
        "title",
        "width",
        "length",
        "price",
        "price_vip",
        "isOpenSales",
    ];

    protected $attributes = [
        "width" => 0,
        "length" => 0,
        "price" => 0,
        "price_vip" => 0,
        "isOpenSales" => 0,
    ];
}
