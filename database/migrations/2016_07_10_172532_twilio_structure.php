<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TwilioStructure extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('twilio');
        Schema::create('twilio', function($table) {


            $table->increments('id');

            $table->integer('from')->unsigned();
            $table->integer('to')->unsigned();

            $table->timestamps();

            $table->engine = 'InnoDB';

            $table->foreign('from')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('to')
                ->references('id')
                ->on('users')
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
        Schema::dropIfExists('twilio');
    }
}
