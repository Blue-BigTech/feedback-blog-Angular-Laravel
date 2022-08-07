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
        Schema::create('users', function (Blueprint $table) {
            $table->string('fname');
            $table->string('lname');
            $table->unique('email');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('email_verif_status')->default(false);
            $table->boolean('feature_init_check')->default(false);
            $table->number('role')->default(0);
            $table->string('avatar');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
