<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Helpers\Helper;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddUsers extends Seeder{

    public function run(){

        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();

        DB::table('users')->insertGetId([
            'first_name' => 'Dportal',
            'last_name' => '',
            'mobile_no' => '+1 (234) 567-8901',
            'phone_no' => '+1 (234) 567-8901',
            'address' => 'Lahore, Punjab, Pakistan',
            'Country' => 'Pakistan',
            'City' => 'Lahore',
            'State' => 'Punjab',
            'zip' => '54000',
            'date_of_birth' => '1985-09-23',
            'u_uid' => Helper::mak_user_unique_id( 1, 'Dportal', 'Medical'),
            'email' => 'admin@dportal.com',
            'created_at' => now(),
            'deleted_at' => null,
            'password' => Hash::make('dportal123'),
            'created_by' => 1,
            'role_id' => 1 // 1 for super admin
        ]);

        $faker = Faker::create();

        foreach (range(1,500) as $index) {

            $user_name = $faker->name;
            $roleId = $faker->numberBetween(3,4);

            $userArray = [

                        'first_name' => $faker->firstName(),
                        'last_name' => $faker->firstName(),
                        'date_of_birth' => $faker->date(),
                        'email' => $faker->safeEmail,
                        'phone_no' => $faker->phoneNumber,
                        'mobile_no' => $faker->phoneNumber,
                        'address' => $faker->streetAddress,
                        'country' => $faker->country,
                        'city' => $faker->city,
                        'state' => $faker->citySuffix,
                        'zip' => $faker->numberBetween(1,56849),
                        'gender' => $faker->numberBetween(1,3),
                        'role_id' => $roleId,
                        'u_uid' => Helper::mak_user_unique_id($index, $user_name, $user_name ),
                        'password' => Hash::make('dportal123'),
                        'created_by' => 1,
                        'profile_media_id' => $faker->numberBetween(2, 12),
                        'deleted_at'=> null,
                        'created_at' => now(),
                ];

            if ($roleId == 4){

                $userArray['status_id'] = 4;
            }else{
                $userArray['status_id'] = 1;
            }

            DB::table('users')->insert($userArray);
        }

        Schema::enableForeignKeyConstraints();
    }
}
