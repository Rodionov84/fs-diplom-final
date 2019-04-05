<?php

namespace App\Api\V1\Controllers;

use App\CinemaHall;
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

class CinemaHallsController extends Controller
{
    use Helpers;

    public function getAll()
    {
        return $this->response->array(CinemaHall::all()->toArray());
    }

    public function add(Request $request)
    {
        $cinema_hall = new CinemaHall;
        $cinema_hall->title = $request->title;
        $cinema_hall->save();

        return $this->response->array($cinema_hall->toArray());
    }

    public function remove(Request $request)
    {
        return $this->response->array([
            "status" => CinemaHall::find($request->id)->delete()
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

    public function openSales(Request $request)
    {
        $cinema_hall = CinemaHall::find($request->id);
        $response = [
            "status" => false
        ];

        if( $cinema_hall != null )
        {
            $cinema_hall->isOpenSales = intval($request->isOpenSales);
            $response["status"] = $cinema_hall->save();
            $response["isOpenSales"] = $cinema_hall->isOpenSales;
        }

        return $this->response->array($response);
    }
}
