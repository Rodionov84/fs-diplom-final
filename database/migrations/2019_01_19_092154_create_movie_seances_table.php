<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovieSeancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movie_seances', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('cinema_hall_id')->unsigned();
            $table->integer('movie_id')->unsigned();
            $table->time('time');
            $table->timestamps();

            $table->foreign('cinema_hall_id')
                ->references('id')->on('cinema_halls')
                ->onDelete('cascade');

            $table->foreign('movie_id')
                ->references('id')->on('movies')
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
        Schema::dropIfExists('movie_seances');
    }
}
