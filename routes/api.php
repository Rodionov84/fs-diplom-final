<?php

use Illuminate\Http\Request;
use Dingo\Api\Routing\Router;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Create Dingo Router
$api = app(Router::class);

// Create a Dingo Version Group
$api->version('v1', ['middleware' => 'api'], function ($api) {
    $api->group(['middleware' => 'auth:api'], function ($api) {
        $api->get('test', 'App\\Api\\V1\\Controllers\\UserController@index');
    });

    $api->group(['middleware' => 'auth:api'], function ($api) {
        $api->get('cinema_halls', 'App\\Api\\V1\\Controllers\\CinemaHallsController@getAll');
        
        $api->post('cinema_halls/add', 'App\\Api\\V1\\Controllers\\CinemaHallsController@add');
        $api->delete('cinema_halls/remove', 'App\\Api\\V1\\Controllers\\CinemaHallsController@remove');
        $api->put('cinema_halls/update', 'App\\Api\\V1\\Controllers\\CinemaHallsController@update');
        $api->put('cinema_halls/update_price', 'App\\Api\\V1\\Controllers\\CinemaHallsController@update_price');
        $api->put('cinema_halls/openSales', 'App\\Api\\V1\\Controllers\\CinemaHallsController@openSales');

        $api->get('cinema_hall_seats', 'App\\Api\\V1\\Controllers\\CinemaHallSeatsController@getAll');

        $api->post('movies/add', 'App\\Api\\V1\\Controllers\\MoviesController@add');
        $api->delete('movies/remove', 'App\\Api\\V1\\Controllers\\MoviesController@remove');

        $api->get('supervisor/check', 'App\\Api\\V1\\Controllers\\SupervisorController@check');
        $api->get('supervisor/punch', 'App\\Api\\V1\\Controllers\\SupervisorController@punch');
    });

    $api->group([], function ($api) {
        $api->get('initial', 'App\\Api\\V1\\Controllers\\InitialController@getAll');

        $api->get('tickets/get_available', 'App\\Api\\V1\\Controllers\\TicketsController@getAvailable');
        $api->post('tickets/booking', 'App\\Api\\V1\\Controllers\\TicketsController@booking');
    });
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
	return "sdfsdgf";
    return $request->user();
});

Route::group(['namespace' => 'Api'], function () {
    Route::group(['namespace' => 'Auth'], function () {
        Route::get('register', 'RegisterController');//get используется временно для регистрации администратора
        Route::post('login', 'LoginController');
        //Route::post('logout', 'LogoutConrtoller')->middleware('auth:api');
    });
});