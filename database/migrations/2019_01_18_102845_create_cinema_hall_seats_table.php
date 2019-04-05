<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCinemaHallSeatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cinema_hall_seats', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('cinema_hall_id')->unsigned();
            $table->boolean('isVip')->default(0);
            $table->tinyInteger('row')->unsigned();
            $table->tinyInteger('seat')->unsigned();
            $table->timestamps();

            $table->foreign('cinema_hall_id')
                ->references('id')->on('cinema_halls')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cinema_hall_seats');
    }
}
