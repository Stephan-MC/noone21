<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateUserCategoryView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement(

            "CREATE OR REPLACE View view_user_categories as
            SELECT user_categories.category_id , user_categories.sub_category_id, user_categories.user_id, user_categories.created_at, user_categories.id,
            categories.`name` as category_name, categories.slug as category_slug,
            sub_categories.`name` as sub_category_name, sub_categories.slug as sub_category_slug,
            concat(users.first_name, ' ', users.last_name ) as user_name
            FROM user_categories
            INNER JOIN categories ON user_categories.category_id = categories.id AND categories.deleted_at IS NULL
            INNER JOIN sub_categories ON user_categories.sub_category_id = sub_categories.id AND sub_categories.deleted_at IS NULL
            INNER JOIN users ON user_categories.user_id = users.id AND users.deleted_at IS NULL
            WHERE user_categories.deleted_at IS NULL"
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('view_user_categories');
    }
}
