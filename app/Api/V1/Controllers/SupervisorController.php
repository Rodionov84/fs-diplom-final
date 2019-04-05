<?php

namespace App\Api\V1\Controllers;

use DB;
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

class SupervisorController extends Controller
{
    use Helpers;

    public function check(Request $request)
    {
        $response = array("status" => false);

        if( isset($request->code) )
        {
            $ticket = Ticket::where('code', $request->code)->first();

            if( $ticket != null ) {
                $response["status"] = $ticket->is_punched == 0 ? true : false;
                $response["ticket"] = $ticket->toArray();
            }
         }

        return $this->response->array( $response );
    }

    public function punch(Request $request)
    {
        $response = array("status" => false);

        if( isset($request->code) )
        {
            $ticket = Ticket::where('code', $request->code)->first();

            if( $ticket != null && $ticket->is_punched == 0 ) {
                $ticket->is_punched = 1;
                $ticket->save();
                $response["status"] = true;
            }
        }

        return $this->response->array( $response );
    }

}
