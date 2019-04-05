<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected  $table = "movies";

    protected $fillable = [
        "name",
        "duration",
        "country",
        "poster",
        "description"
    ];
}
