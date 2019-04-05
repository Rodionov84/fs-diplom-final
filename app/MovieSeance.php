<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MovieSeance extends Model
{
    protected  $table = "movie_seances";

    protected $fillable = [
        "cinema_hall_id",
        "movie_id",
        "time"
    ];
}
