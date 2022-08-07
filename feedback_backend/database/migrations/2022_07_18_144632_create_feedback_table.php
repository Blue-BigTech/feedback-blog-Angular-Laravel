<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feedback', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('details');
            $table->tinyInteger('category')->default(1);
            $table->array('votes')->default(array());
            $table->array('comments')->default(array());
            $table->foreign('user_id')->references('id')->on('users');
            $table->tinyInteger('notify')->default(0);
            $table->array('file')->default(array());
            $table->tinyInteger('status')->default(1);
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
        Schema::dropIfExists('feedback');
    }
};
