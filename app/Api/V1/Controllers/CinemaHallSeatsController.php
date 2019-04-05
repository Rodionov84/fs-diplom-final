<?php

namespace App\Api\V1\Controllers;

use App\CinemaHallSeat;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;
use League\Fractal\Resource\Collection;
use App\Api\V1\Transformers\UserTransformer;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Dingo\Api\Routing\Helpers;

class CinemaHallSeatsController extends Controller
{
    use Helpers;

    public function getAll(Request $request)
    {
        $cinema_hall_seats = CinemaHallSeat::where("cinema_hall_id", $request->cinema_hall_id)->get();
        return $this->response->array($cinema_hall_seats->toArray());
    }
}
