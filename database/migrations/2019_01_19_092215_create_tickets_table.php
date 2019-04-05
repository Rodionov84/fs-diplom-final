<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('movie_seance_id')->unsigned();
            $table->date('date');
            $table->char('code', 32)->unique();
            $table->boolean('is_punched')->default(0);
            $table->decimal('price', 5, 2)->unsigned();
            $table->timestamps();

            $table->foreign('movie_seance_id')
                ->references('id')->on('movie_seances')
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
        Schema::dropIfExists('tickets');
    }
}
