<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Faker\Factory as Faker;

class AddFaqs extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){

        $faker = Faker::create();

        Schema::disableForeignKeyConstraints();
        DB::table('faqs')->truncate();

        foreach (range(1,100) as $index) {

            DB::table('faqs')->insert([

                'question' => $faker->jobTitle,
                'answer' => $faker->text(50),
                'description' => $faker->text(150),
                'created_by' => 1,
                'deleted_at'=> null,
                'created_at' => now(),
            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
