<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCinemaHallsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cinema_halls', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 50);
            $table->tinyInteger('width')->unsigned();
            $table->tinyInteger('length')->unsigned();
            $table->decimal('price', 5, 2)->unsigned();
            $table->decimal('price_vip', 5, 2)->unsigned();
            $table->tinyInteger('isOpenSales')->unsigned()->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cinema_halls');
    }
}
