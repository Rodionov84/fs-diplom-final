<?php
/**
 * Created by PhpStorm.
 * User: Илья
 * Date: 12.02.2019
 * Time: 13:58
 */

namespace App\Http\Controllers;


class ClientController extends Controller
{
    public function spa()
    {
        return view('clientSPA');
    }
}
