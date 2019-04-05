<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected  $table = "tickets";

    protected $fillable = [
        "movie_seance_id",
        "code",
        "is_punched",
        "price"
    ];
}
