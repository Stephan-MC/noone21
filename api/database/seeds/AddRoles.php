<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddRoles extends Seeder{

    public function run(){

        Schema::disableForeignKeyConstraints();
        DB::table('roles')->truncate();

        DB::table('roles')->insert([
            ['name'  => 'super admin', 'description'  => 'this is for developer account', 'created_by'=>1, 'created_at' => now() ],
            ['name'  => 'admin', 'description'  => 'this is for client account', 'created_by'=>1, 'created_at' => now()],
            ['name'  => 'patient', 'description'  => 'this is for patient account', 'created_by'=>1, 'created_at' => now()],
            ['name'  => 'doctor', 'description'  => 'this is for doctor account', 'created_by'=>1, 'created_at' => now()]
        ]);

        Schema::enableForeignKeyConstraints();
    }
}
