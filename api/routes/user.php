<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// simple user routes

Route::get('message/get/23', 'UserController@messageSingle');
Route::put('/edit', 'UserController@edit');
Route::post('userVideo/add', 'VideoController@add');
Route::put('userVideo/edit', 'VideoController@edit');
Route::delete('userVideo/{id}', 'VideoController@delete');
Route::post('userImage/add', 'ImageController@add');
Route::put('userImage/edit', 'ImageController@edit');
Route::delete('userImage/{id}', 'ImageController@delete');
Route::post('upload-profile-image/add', 'UserController@UploadProfileImg');
Route::put('education/edit', 'UserEducationController@edit');
Route::post('education/add', 'UserEducationController@add');
Route::put('education/edit', 'UserEducationController@edit');
Route::delete('education/delete', 'UserEducationController@delete');
Route::group(['middleware' => ['auth:api','role:Vendor']], function () {
    Route::post('/testApi', function() {
            return json_encode(['status'=>true,'message'=>'succusse test api']);


    });
   
//========================User===============================================
    
    Route::post('/reset-password-by-admin', 'UserController@resetPasswordByAdmin');
    Route::post('/change-password', 'UserController@changePassword');
    Route::delete('consultation/delete', 'UserConsultationController@delete');
  
    Route::post('consultation/add', 'UserConsultationController@add');
    Route::put('consultation/edit', 'UserConsultationController@edit');
    Route::post('category/add', 'UserCategoryController@add');
    Route::put('category/edit', 'UserCategoryController@edit');
    Route::delete('category/delete', 'UserCategoryController@delete');
    Route::delete('userCategory/delete', 'UserCategoryController@deleteUserCat');
  
    Route::post('faq/add', 'UserFaqController@add');
    Route::put('faq/edit', 'UserFaqController@edit');
    Route::delete('faq/delete', 'UserFaqController@delete');
    // Route::post('userVideo/add', 'VideoController@add');
    // Route::put('userVideo/edit', 'VideoController@edit');
    // Route::delete('userVideo/{id}', 'VideoController@delete');
    // Route::post('userImage/add', 'ImageController@add');
    // Route::put('userImage/edit', 'ImageController@edit');
    // Route::delete('userImage/{id}', 'ImageController@delete');
    // Route::post('upload-profile-image/add', 'UserController@UploadProfileImg');
  
});
Route::group(['middleware' => ['auth:api','role:SuperAdmin']], function () {
    //========================User===============================================
         
        Route::post('/delete', 'UserController@delete');
        Route::post('/reset-password-by-admin', 'UserController@resetPasswordByAdmin');
        Route::post('review/add', 'UserReviewController@add');
        Route::delete('review/delete', 'UserReviewController@delete');
        Route::put('review/approve', 'UserReviewController@approve');
        Route::put('review/edit', 'UserReviewController@edit');
        Route::post('approval/add', 'UserApprovalController@add');
        
        Route::post('faq/add', 'UserFaqController@add');
        Route::put('faq/edit', 'UserFaqController@edit');
        Route::delete('faq/delete', 'UserFaqController@delete');
     
    });
    Route::post('/reset-password-by-admin', 'UserController@resetPasswordByAdmin');
Route::post('/register', 'UserController@register');
Route::post('/social-login', 'UserController@socialLogin');
Route::post('/login', 'UserController@login');
Route::get('/logout', 'UserController@logout');
Route::get('/forgot-password', 'UserController@forgotPassword');
Route::get('/password-reset', 'UserController@passwordReset');

Route::get('/', 'UserController@index');
Route::get('verifyUser/{token}', 'UserController@verifyUserAccount');
// education types
Route::get('education/type', 'EducationTypeController@index');
// get all roles
Route::get('/role', 'RoleController@index');
// all routes for user education
Route::get('education', 'UserEducationController@index');
Route::get('education/{id}', 'UserEducationController@single');
// all routes for user consultations
Route::get('consultation', 'UserConsultationController@index');
Route::get('consultation/{id}', 'UserConsultationController@single');
// all routes for user category
Route::get('category', 'UserCategoryController@index');
Route::get('category/{id}', 'UserCategoryController@single');

// all routes for user reviews
Route::get('review', 'UserReviewController@index');

Route::get('review/{id}', 'UserReviewController@single');


// all routes for user approvals
Route::get('approval', 'UserApprovalController@index');

Route::get('approval/{id}', 'UserApprovalController@single');

// all routes for user faq
Route::get('faq/{id}', 'UserFaqController@single');
Route::get('faq', 'UserFaqController@index');
Route::get('/{id}', 'UserController@single');
// all routes for user specail feuture
Route::get('userVideo', 'VideoController@index');
Route::get('userVideo/{id}', 'VideoController@single');
Route::get('userImage', 'ImageController@index');
Route::get('userImage/{id}', 'ImageController@single');


Route::get('userImageApproval/{id}', 'ImageController@singleApproval');
Route::delete('imgDelApproval', 'ImageController@imgDelApproval');

Route::get('userVideoApproval/{id}', 'VideoController@userVideoApproval');
Route::delete('video_Delete_Approval', 'VideoController@video_Delete_Approval');
Route::delete('user-education/delapproval', 'UserEducationController@delapproval');

Route::get('user-education/get-edu-approval', 'UserEducationController@getApproval');

Route::get('get-approval-user/single', 'UserController@getUserApproval');

