<?php

namespace App\Api\V1\Controllers;

use App\Movie;
use App\MovieSeance;
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

class MoviesController extends Controller
{
    use Helpers;

    public function getAll()
    {
        return $this->response->array(Movie::all()->toArray());
    }

    public function add(Request $request)
    {
        $movie = new Movie();
        $movie->name = $request->name;
        $movie->description = $request->description;
        $movie->duration = $request->duration;
        $movie->country = $request->country;
        $movie->poster = $request->poster;
        $movie->save();

        $seances = json_decode($request->seances);
        foreach ($seances as $seance_info)
        {
            $seance = MovieSeance::findOrNew($seance_info->id);
            $seance->cinema_hall_id = $seance_info->cinema_hall_id;
            $seance->movie_id = $movie->id;
            $seance->time = $seance_info->time;
            $seance->save();
        }

        return $this->response->array(
            array(
                "movie" => $movie->toArray(),
                "seances" => MovieSeance::where("movie_id", $movie->id)->get()
            )
        );
    }

    public function remove(Request $request)
    {
        return $this->response->array([
            "status" => Movie::find($request->id)->delete()
        ]);
    }

    public function update(Request $request)
    {
        $cinema_hall = CinemaHall::find($request->id);

        if( $cinema_hall != null )
        {
            $width = $request->width;
            $length = $request->length;

            if( $width != "" )  $cinema_hall->width = intval($width);
            if( $length != "" )  $cinema_hall->length = intval($length);

            $cinema_hall->save();
        }

        $seats_update = json_decode($request->seats_update);
        foreach ($seats_update as $update)
        {
            $seat = CinemaHallSeat::find($update->id);
            if( $seat == null )
            {
                $seat = new CinemaHallSeat;
                $seat->cinema_hall_id = $request->id;
                $seat->row = intval($update->row);
                $seat->seat = intval($update->seat);
            }
            $seat->isVip = intval($update->isVip);
            $seat->save();
        }

        $seats_delete = json_decode($request->seats_delete);
        foreach ($seats_delete as $delete)
        {
            CinemaHallSeat::find($delete->id)->delete();
        }

        return $this->response->array($cinema_hall->toArray());
    }

    public function update_price(Request $request)
    {
        $cinema_hall = CinemaHall::find($request->id);

        if( $cinema_hall != null )
        {
            $price = $request->price;
            $price_vip = $request->price_vip;

            if( $price != "" )  $cinema_hall->price = floatval($price);
            if( $price_vip != "" )  $cinema_hall->price_vip = floatval($price_vip);

            $cinema_hall->save();
        }

        return $this->response->array($cinema_hall->toArray());
    }
}
