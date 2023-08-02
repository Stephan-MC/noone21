<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::dropIfExists('users');

        Schema::create('users', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->string('u_uid')->unique()->nullable();
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->longText('about_me')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('email')->unique();
            $table->string('phone_no')->unique()->nullable();
            $table->string('mobile_no')->unique()->nullable();
            $table->string('address')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('facebook_link')->nullable();
            $table->string('google_link')->nullable();
            $table->string('twitter_link')->nullable();
            $table->string('pinterest_link')->nullable();
            $table->string('fcm_token')->nullable();
            $table->text('active_jwt_token')->nullable();
            $table->string('device_type')->nullable();
            $table->string('social_id')->unique()->nullable();
            $table->tinyInteger('social_type')->nullable()->comment('1=facebook, 2=google');
            $table->tinyInteger('availability')->nullable()->comment('1=daily, 2=morning, 3=evening, 4=night');
            $table->decimal('price', 10, 2)->nullable();
            $table->string('avg_wait_time')->nullable();
            $table->string('avg_consultation_time')->nullable();
            $table->boolean('is_block')->comment('1=yes,0=no')->default(0);
            $table->tinyInteger('gender')->comment('1=male,2=female,3=other')->nullable();
            $table->tinyInteger('status_id')->comment('1=created, 2=waiting_for_approval, 3=rejected, 4=Approved')->default(2);
            $table->bigInteger('role_id')->unsigned()->nullable();
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('set null');
//            $table->bigInteger('category_id')->unsigned()->nullable();
//            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            $table->bigInteger('profile_media_id')->unsigned()->nullable();
            $table->foreign('profile_media_id')->references('id')->on('media')->onDelete('set null');
            $table->decimal('lng', 10, 7)->nullable();
            $table->decimal('lat', 10, 7)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->enum('is_email_verified', [0, 1])->comment('1=yes,0=no')->default(0);
            $table->string('password');
            $table->rememberToken();
            $table->softDeletes()->index();
            $table->timestamps();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();

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
}
