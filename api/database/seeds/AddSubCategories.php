<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddSubCategories extends Seeder
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
        DB::table('sub_categories')->truncate();


        foreach (range(1,100) as $index) {

            DB::table('sub_categories')->insert([

                'name' => $faker->jobTitle,
                'description' => $faker->text(150),
                'category_id' => $faker->numberBetween(1, 5),
                'slug' => $faker->slug,
                'created_by' => 1,
                'created_at' => now(),
            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
