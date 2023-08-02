<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddUserConditionTreated extends Seeder
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
        DB::table('user_condition_treated')->truncate();

        foreach (range(1,2000) as $index) {

            DB::table('user_condition_treated')->insert([
                'user_id' => $faker->numberBetween(2, 500),
                'condition_treated_id' => $faker->numberBetween(2, 100),
                'created_by' => 1,
                'deleted_at'=> null,
                'created_at' => now(),
            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
