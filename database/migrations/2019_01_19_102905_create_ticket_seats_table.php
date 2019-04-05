<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketSeatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ticket_seats', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('ticket_id')->unsigned();
            $table->integer('cinema_hall_seat_id')->unsigned();
            $table->timestamps();

            $table->foreign('ticket_id')
                ->references('id')->on('tickets')
                ->onDelete('cascade');

            $table->foreign('cinema_hall_seat_id')
                ->references('id')->on('cinema_hall_seats')
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
        Schema::dropIfExists('ticket_seats');
    }
}
