<?php

namespace App\Api\V1\Controllers;

//use App\DataBase;
use App\CinemaHall;
use DB;
use App\Quotation;
use App\MovieSeance;
use App\CinemaHallSeat;
use App\Ticket;
use App\TicketSeat;
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

class TicketsController extends Controller
{
    use Helpers;

    public function getAvailable(Request $request)
    {
        $cinemaHallSeats = array();
        if (isset($request->movie_seance_id) && isset($request->date)) {
            $seance = MovieSeance::findOrNew($request->movie_seance_id);
            $cinemaHallSeats = CinemaHallSeat::where('cinema_hall_id', $seance->cinema_hall_id)
                ->select('id', 'isVip', 'row', 'seat')
                ->get()
                ->toArray();

            $ticketsIds = DB::table('tickets')
                ->where('movie_seance_id', $request->movie_seance_id)
                ->where('date', $request->date)
                ->pluck('id');

            $ticketsSeats = DB::table('ticket_seats')
                ->whereIn('ticket_id', $ticketsIds)
                ->pluck('cinema_hall_seat_id');

            foreach ($cinemaHallSeats as $index => $seat) {
                $isAvailable = true;

                foreach ($ticketsSeats as $id) {
                    if ($seat["id"] == $id) {
                        $isAvailable = false;
                        break;
                    }
                }
                $cinemaHallSeats[$index]["isAvailable"] = $isAvailable;
            }
        }

        return $this->response->array( $cinemaHallSeats );
    }

    public function booking(Request $request)
    {
        $response = array( "status" => false );

        if (isset($request->movie_seance_id) && isset($request->date) && isset($request->seats))
        {
            $seance = MovieSeance::findOrNew($request->movie_seance_id);
            $cinemaHallSeats = CinemaHallSeat::whereIn('id', explode("_", $request->seats))
                ->where('cinema_hall_id', $seance->cinema_hall_id)
                ->select('id', 'isVip')
                ->get()
                ->toArray();

            if( count( $cinemaHallSeats ) )
            {
                $cinema_hall = CinemaHall::find( $seance->cinema_hall_id );
                $price = 0;

                foreach ($cinemaHallSeats as $seat)
                {
                    $price += $seat["isVip"] ? $cinema_hall->price_vip : $cinema_hall->price;
                }

                $ticket = new Ticket();
                $ticket->movie_seance_id = $request->movie_seance_id;
                $ticket->date = $request->date;
                $ticket->price = $price;
                $ticket->code = md5(uniqid());
                $ticket->is_punched = 0;
                $ticket->save();

                foreach ($cinemaHallSeats as $seat)
                {
                    $ticketSeat = new TicketSeat();
                    $ticketSeat->ticket_id = $ticket->id;
                    $ticketSeat->cinema_hall_seat_id = $seat["id"];
                    $ticketSeat->save();
                }

                $response["status"] = true;
                $response["ticket"] = $ticket->toArray();
            }
        }

        return $this->response->array( $response );
    }
}
