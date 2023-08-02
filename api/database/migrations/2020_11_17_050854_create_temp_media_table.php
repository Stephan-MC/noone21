<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTempMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('temp_media', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('real_name')->nullable();
            $table->string('system_name')->nullable();
            $table->string('base_path')->nullable();
            $table->string('alt_name')->nullable();
            $table->string('extension')->nullable();
            $table->string('size')->nullable();
            $table->string('description')->nullable();
            $table->bigInteger('user_id')->nullable();
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
        Schema::dropIfExists('temp_media');
    }
}
