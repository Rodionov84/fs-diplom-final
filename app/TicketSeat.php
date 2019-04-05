<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketSeat extends Model
{
    protected  $table = "ticket_seats";

    protected $fillable = [
        "ticket_id",
        "cinema_hall_seat_id"
    ];
}
