<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddConsultations extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        $faker = Faker::create();

        Schema::disableForeignKeyConstraints();
        DB::table('consultations')->truncate();

        foreach (range(1,100) as $index) {

            DB::table('consultations')->insert([

                'name' => $faker->jobTitle,
                'description' => $faker->text(150),
                'slug' => $faker->slug,
                'created_by' => 1,
                'deleted_at'=> null,
                'created_at' => now(),
            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
