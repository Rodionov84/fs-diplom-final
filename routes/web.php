<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',  ['uses' => 'ClientController@spa']);

Route::group(['prefix'=>'admin','middleware'=>['web']], function () {
    Route::get('/',  ['uses' => 'AdminController@spa']);
});

Route::get('/ticket/{code}.png', function ($code)
{
    return QRCode::text($code)->png();
});

Route::get('/welcome', function () {
    return view('welcome');
});
