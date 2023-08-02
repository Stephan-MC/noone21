<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddUserEducations extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        Schema::disableForeignKeyConstraints();
        DB::table('user_educations')->truncate();

        foreach (range(1,50) as $index) {

            $user_name = $faker->name;
            DB::table('user_educations')->insert([

                'title' => $faker->jobTitle,
                'start_date' => $faker->date(),
                'end_date' => $faker->date(),
                'details' => $faker->text(200),
                'institute' => $faker->company,
                'education_type_id' => $faker->numberBetween(1,4),
                'user_id' => $faker->numberBetween(1, 50),
                'created_by' => 1,
                'deleted_at'=> null,
                'created_at' => now(),

            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
