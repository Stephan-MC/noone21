<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'HomeController@homePage');

Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.update');


//Route::post('login', 'Auth\LoginController@login')->name('login');
//Route::post('logout', 'Auth\LoginController@logout')->name('logout');

//// Registration Routes...
//Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
//Route::post('register', 'Auth\RegisterController@register');

// Password Reset Routes...
//Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
//Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
//Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
//Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.update');
//
//// Email Verification Routes...
//Route::get('email/verify', 'Auth\VerificationController@show')->name('verification.notice');
//Route::get('email/verify/{id}/{hash}', 'Auth\VerificationController@verify')->name('verification.verify');
//Route::post('email/resend', 'Auth\VerificationController@resend')->name('verification.resend');

//Route::group(['middleware' => ['auth', 'api']], function () {
//
//        // main dashboard of admin
//        Route::namespace('Dashboard')->group(function () {
//            Route::get('admin/', 'DashboardController@dashboard');
//            Route::get('admin/contact-us/queries', 'DashboardController@contactQueries');
//        });
//
//        // all admin user routes
//        Route::namespace('User')->group(function () {
//            Route::get('admin/user/add', 'UserController@login_view');
//            Route::get('admin/user/add', 'UserController@add_view');
//            Route::get('admin/user', 'UserController@index');
//            Route::get('admin/user/{id}', 'UserController@single');
//            Route::post('admin/user/add', 'UserController@add')->name('user.add');
//            Route::get('admin/user/edit/{id}', 'UserController@edit_view');
//            Route::post('admin/user/edit/', 'UserController@edit')->name('user.edit');
//            Route::post('admin/user/action', 'UserController@action');
//        });
//
//        // all admin user routes
//        Route::namespace('Property')->group(function () {
//            Route::get('admin/property', 'PropertyController@index');
//        });
//
//        // admin company routes
//        Route::namespace('Company')->group(function () {
//            Route::get('admin/company/profile', 'CompanyController@edit_view');
//            Route::post('admin/company/profile', 'CompanyController@edit')->name('company.profile');
//        });
//
//        // admin activity logs
//        Route::namespace('Log')->group(function () {
//            Route::get('admin/log', 'LogController@index');
//        });
//
//});
Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
   Artisan::call('config:clear');
   Artisan::call('view:clear');
   Cache::flush();
   return "Cleared!";
});