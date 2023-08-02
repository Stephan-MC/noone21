<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationTypeTable extends Migration{

    public function up(){

        Schema::create('education_types', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('slug');
                $table->string('name');
                $table->string('description');
                $table->softDeletes()->index();
                $table->timestamps();
                $table->bigInteger('created_by')->unsigned()->nullable();
                $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
                $table->bigInteger('updated_by')->unsigned()->nullable();
                $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
            });
    }

    public function down(){
        Schema::dropIfExists('education_types');
    }
}
