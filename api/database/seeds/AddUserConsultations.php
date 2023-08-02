<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddUserConsultations extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){

        $faker = Faker::create();

        Schema::disableForeignKeyConstraints();
        DB::table('user_consultations')->truncate();

        foreach (range(1,100) as $index) {

            DB::table('user_consultations')->insert([

                'consultation_id' => $faker->numberBetween(1, 50),
                'user_id' => $faker->numberBetween(1, 20),
                'charges' => $faker->numberBetween(100, 500),
                'created_by' => 1,
                'deleted_at'=> null,
                'created_at' => now(),

            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
