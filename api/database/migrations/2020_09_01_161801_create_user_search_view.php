<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateUserSearchView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement(

            " CREATE OR REPLACE View user_search_view as
            select users.id as user_id, users.first_name, users.last_name, categories.name as category_name, services.name as service_name, condition_treated.name as condition_treated_name, consultations.name as consultation_name
            from users
            inner join user_categories on users.id = user_categories.user_id and user_categories.deleted_at is null
            inner join categories on user_categories.category_id = categories.id and categories.deleted_at is null
            inner join user_services on users.id = user_services.user_id and user_services.deleted_at is null
            inner join services on user_services.service_id = services.id and services.deleted_at is null
            inner join user_condition_treated on users.id = user_condition_treated.user_id and user_condition_treated.deleted_at is null
            inner join condition_treated on user_condition_treated.condition_treated_id = condition_treated.id and condition_treated.deleted_at is null
            inner join user_consultations on users.id = user_consultations.user_id and user_consultations.deleted_at is null
            inner join consultations on user_consultations.consultation_id = consultations.id and consultations.deleted_at is null
            where users.status_id = 4 and users.deleted_at is null"
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_search_view');
    }
}
