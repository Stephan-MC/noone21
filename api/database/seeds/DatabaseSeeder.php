<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AddRoles::class);
        $this->call(AddMedia::class);
        $this->call(AddUsers::class);
        $this->call(AddEducationTypes::class);
        $this->call(AddUserEducations::class);
        $this->call(AddConsultations::class);
        $this->call(AddCategories::class);
        $this->call(AddUserConsultations::class);
        $this->call(AddRejectionReasons::class);
        $this->call(AddSubCategories::class);
        $this->call(AddServices::class);
        $this->call(AddConditionTreated::class);
        $this->call(AddFaqs::class);
        $this->call(AddUserService::class);
        $this->call(AddUserConditionTreated::class);
        $this->call(AddUserFaqs::class);
    }
}
