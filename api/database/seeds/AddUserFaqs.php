<?PHP

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddUserFaqs extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){

        $faker = Faker::create();

        Schema::disableForeignKeyConstraints();
        DB::table('user_faqs')->truncate();

        foreach (range(1,50) as $index) {

            DB::table('user_faqs')->insert([
                'user_id' => $faker->numberBetween(2, 50),
                'faq_id' => $faker->numberBetween(2, 10),
                'answer' => $faker->text('200'),
                'created_by' => 1,
                'deleted_at'=> null,
                'created_at' => now(),
            ]);
        }

        Schema::enableForeignKeyConstraints();
    }
}
