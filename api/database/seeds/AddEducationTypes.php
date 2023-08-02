<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddEducationTypes extends Seeder{

    public function run(){

        Schema::disableForeignKeyConstraints();
        DB::table('education_types')->truncate();

        DB::table('education_types')->insert([
            ['name'  => 'Education', 'slug' => 'eduction',  'description'  => 'main education', 'created_by'=>1, 'created_at' => now() ],
            ['name'  => 'Specialization', 'slug' => 'specialization',  'description'  => 'main specialization', 'created_by'=>1, 'created_at' => now() ],
            ['name'  => 'Awards', 'slug' => 'awards',  'description'  => 'Awards', 'created_by'=>1, 'created_at' => now() ],
            ['name'  => 'Professional Membership', 'slug' => 'professional-membership',  'description'  => 'Professional Membership', 'created_by'=>1, 'created_at' => now() ],
            ['name'  => 'Experience', 'slug' => 'experience',  'description'  => 'doctor_exprience', 'created_by'=>1, 'created_at' => now() ],
        ]);

        Schema::enableForeignKeyConstraints();
    }
}
