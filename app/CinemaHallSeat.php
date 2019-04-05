<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CinemaHallSeat extends Model
{
    protected  $table = "cinema_hall_seats";

    protected $fillable = [
        "cinema_hall_id",
        "isVip",
        "row",
        "seat"
    ];
}
