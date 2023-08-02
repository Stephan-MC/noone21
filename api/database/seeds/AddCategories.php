<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddCategories extends Seeder
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
        DB::table('categories')->truncate();

        foreach (range(1,5) as $index) {

            DB::table('categories')->insert([

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
