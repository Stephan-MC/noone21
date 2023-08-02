<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddConditionTreated extends Seeder
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
        DB::table('condition_treated')->truncate();

        foreach (range(1,100) as $index) {

            DB::table('condition_treated')->insert([

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
