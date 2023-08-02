<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateUserFaqsView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        DB::statement(

            " CREATE OR REPLACE View user_faq_view as
            select user_faqs.user_id, user_faqs.faq_id, user_faqs.answer, user_faqs.id, faqs.question
            from user_faqs
            inner join faqs on user_faqs.faq_id = faqs.id and faqs.deleted_at is null
            where user_faqs.deleted_at is NULL"
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_faq_view');
    }
}
