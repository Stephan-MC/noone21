<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Route::get('auth/user', 'AuthController@me');
// Route::post('register', 'UserController@register');
// Route::post('login', 'UserController@authenticate');
// Route::get('open', 'DataController@open');


// Route::group(['middleware' => ['jwt.verify']], function() {
//     Route::get('user', 'UserController@getAuthenticatedUser');
//     Route::get('closed', 'DataController@closed');
// });
// all routes for users
Route::namespace('Api')->group(function () {

//    // user related routes start
//    Route::post('/user/sign-up', 'ApiController@addUser');
//    Route::get('/user/profile', 'ApiController@profileUser');
//    Route::post('/user/edit', 'ApiController@editUser');
//    Route::put('/user/login', 'ApiController@loginUser');
//    Route::get('/user/logout', 'ApiController@logoutUser');
//    Route::post('/user/media', 'ApiController@mediaUser');
//    Route::get('/user/sendResetLink', 'ApiController@forgotPasswordUser');
//    Route::get('/user/sendVerifyEmail', 'ApiController@sendVerifyEmail');
//    Route::get('/user/verify/{token}', 'ApiController@verifyUser');
//    Route::put('/user/social-login', 'ApiController@socialLogin');
//    Route::get('/user/agent', 'ApiController@getAgents');
//    // user related routes end
//
//
//
//    // user rating related routes start
//    Route::post('/user/rating/add', 'ApiController@addUserRating');
//    Route::get('/user/rating', 'ApiController@getUserRating');
//    // user rating related routes end
//
//
//
//
//    // property related routes start
//    Route::post('/property/add', 'ApiController@addProperty');
//    Route::post('/property/edit', 'ApiController@editProperty');
//    Route::post('/property/media/add', 'ApiController@addMediaProperty');
//    Route::get('/property/all', 'ApiController@indexProperty');
//    Route::get('/property/single', 'ApiController@singleProperty');
//    Route::delete('/property/delete', 'ApiController@deleteProperty');
//    Route::post('/property/favorite/add', 'ApiController@AddFavoriteProperty');
//    Route::get('/property/favorite/user', 'ApiController@UserFavoriteProperty');
//    Route::get('/property/near-by', 'ApiController@nearBy');
//    Route::delete('/property/favorite/delete', 'ApiController@DeleteFavoriteProperty');
//    Route::get('/property/attribute/all', 'ApiController@propertyAttributes');
//    // property related routes end
//
//
//
//    // stripe card related routes start
//    Route::post('/stripe/card/add_new', 'ApiController@addCreditCard');
//    Route::get('/stripe/user/card', 'ApiController@getUserCard');
//    Route::delete('/stripe/card/delete', 'ApiController@deleteCard');
//    // stripe card related routes end
//
//
//
//    // subscriptions related routes start
//    Route::post('/subscribe/add', 'ApiController@addSubscription');
//    Route::post('/property/view/add', 'ApiController@propertyViewsByUsers');
//    Route::put('/subscribe/edit', 'ApiController@editSubscription');
//    Route::get('/subscribe/user', 'ApiController@getUserSubscription');
//    Route::delete('/subscribe/delete', 'ApiController@deleteSubscription');
//    // stripe card related routes end
//
//
//
//    // delete media from anywhere
//    Route::delete('/media/delete', 'ApiController@DeleteMedia');
//    Route::get('/home/page', 'ApiController@homePage');
//
//
//    // fcm token routes
//    Route::put('/notification/update/token', 'ApiController@updateFcmToken');
//    Route::put('/notification/mark-read', 'ApiController@markReadNotification');
//    Route::get('/notification/user', 'ApiController@userNotifications');
//    Route::get('/notification/send', 'ApiController@testNotification');
//
//
//    // payment routes
//    Route::get('/payment/add/testing', 'ApiController@test_payment');

});