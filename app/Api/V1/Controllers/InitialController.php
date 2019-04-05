<?php

namespace App\Api\V1\Controllers;

use App\CinemaHall;
use App\Movie;
use App\MovieSeance;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use League\Fractal\Resource\Collection;
use App\Api\V1\Transformers\UserTransformer;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Dingo\Api\Routing\Helpers;

class InitialController extends Controller
{
    use Helpers;

    public function getAll()
    {
        return $this->response->array([
            "cinema_halls" => CinemaHall::all()->toArray(),
            "movies" => Movie::all()->toArray(),
            "movie_seances" => MovieSeance::all()->toArray()
        ]);
    }
}
