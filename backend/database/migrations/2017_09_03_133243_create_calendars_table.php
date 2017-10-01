<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCalendarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calendars', function (Blueprint $table) {
            //$table->increments('id');
            $table->timestamps();

            $table->integer('user')->unsigned();
            $table->foreign('user')->references('id')->on('users')->onDelete('cascade');

            $table->char('week', 1);
            $table->integer('day')->unsigned();
            $table->char('state', 1);
            $table->string('comment');
            // user
            // week - s/l
            // day - m/t/w/th/fr/sa/su
            // state - n/oc/may/free
            // comment - t
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('calendars');
    }
}
