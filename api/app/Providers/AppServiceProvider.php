<?php

namespace App\Providers;

use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
      
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \Braintree_Configuration::environment(env('BRAINTREE_ENV'));
        \Braintree_Configuration::merchantId(env('BRAINTREE_MERCHANT_ID'));
        \Braintree_Configuration::publicKey(env('BRAINTREE_PUBLIC_KEY'));
        \Braintree_Configuration::privateKey(env('BRAINTREE_PRIVATE_KEY'));

//        \Event::listen(
//             QueryException::class,
//             function (QueryExecuted $query) {
//                 // Format binding data for sql insertion
//                 foreach ($query->bindings as $i => $binding) {
//                     if ($binding instanceof \DateTime) {
//                         $query->bindings[ $i ] = $binding->format('\'Y-m-d H:i:s\'');
//                     } else {
//                         if (is_string($binding)) {
//                             $query->bindings[ $i ] = "'$binding'";
//                         }
//                     }
//                 }
//                 // Insert bindings into query
//                 $boundSql = str_replace(['%', '?'], ['%%', '%s'], $query->sql);
//                 $boundSql = vsprintf($boundSql, $query->bindings);
//                 Log::debug(
//                     "TIME - {$query->time}ms\n" .
//                     "                                   UNBOUND QUERY: {$query->sql};\n" .
//                     "                                   BOUND QUERY: $boundSql;"
//                 );
//             }
//         );

        Schema::defaultStringLength(191);

        // validate lat values
        Validator::extend('lat', function ($attribute, $value, $parameters, $validator) {
            $inputs = $validator->getData();
            $lat = $inputs['lat'];
            return preg_match('/^(\+|-)?(?:90(?:(?:\.0{1,20})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,20})?))$/', $lat);
        });

        // validate lng values
        Validator::extend('lng', function ($attribute, $value, $parameters, $validator) {
            $inputs = $validator->getData();
            $lng = $inputs['lng'];
            return preg_match('/^(\+|-)?(?:180(?:(?:\.0{1,20})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,20})?))$/', $lng);
        });
    }
}
