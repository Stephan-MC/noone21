<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(['middleware' => ['auth:api','role:Vendor']], function () {
  
// =========================== requestLead ===============================================
   
    Route::get('requestlead/list', 'RequestLeads\RequestLeadController@index');

 // ============================rejection-reason===================================================

});

Route::group(['middleware' => ['auth:api','role:SUPERADMIN']], function () {
    Route::delete('category/delete', 'Category\CategoryController@delete');
    Route::put('category/edit', 'Category\CategoryController@edit');
    Route::post('category/add', 'Category\CategoryController@add');
    Route::post('sub-category/add', 'Category\SubCategoryController@add');
    Route::put('sub-category/edit', 'Category\SubCategoryController@edit');
    Route::delete('sub-category/delete', 'Category\SubCategoryController@delete');
   
    Route::put('requestlead/edit', 'RequestLeads\RequestLeadController@edit');
 // ============================rejection-reason===================================================

    Route::post('rejection-reason/add', 'RejectionReason\RejectionReasonController@add');
    Route::put('rejection-reason/edit', 'RejectionReason\RejectionReasonController@edit');

    Route::delete('rejection-reason/delete', 'RejectionReason\RejectionReasonController@delete');

// ============================service=============================================================

 Route::post('service/add', 'Service\ServiceController@add');
 Route::put('service/edit', 'Service\ServiceController@edit');
 Route::delete('service/delete', 'Service\ServiceController@delete');

// ============================condition-treated=============================================================


 Route::post('condition-treated/add', 'ConditionTreated\ConditionTreatedController@add');
 Route::put('condition-treated/edit', 'ConditionTreated\ConditionTreatedController@edit');
 
 Route::delete('condition-treated/delete', 'ConditionTreated\ConditionTreatedController@delete');
// ============================   faq           =============================================================
    Route::post('faq/add', 'Faq\FaqController@add');
    Route::put('faq/edit', 'Faq\FaqController@edit');
    Route::delete('faq/delete', 'Faq\FaqController@delete');


});
Route::post('requestLead/add', 'RequestLeads\RequestLeadController@store');
Route::get('requestLead/addget', 'RequestLeads\RequestLeadController@addget');
    // get all routes for category
    Route::get('category', 'Category\CategoryController@index');
    Route::get('category/sub/all', 'Category\CategoryController@all');
    Route::get('category/{id}', 'Category\CategoryController@single');
    Route::get('getUserCategory', 'Category\CategoryController@getUserCategory');
    // get all routes for sub category
    Route::get('sub-category', 'Category\SubCategoryController@index');
    Route::get('sub-category/{id}', 'Category\SubCategoryController@single');
    // get all routes for consultation
    Route::get('consultation', 'Consultation\ConsultationController@index');
    // get all routes for rejection reasons
    Route::get('rejection-reason', 'RejectionReason\RejectionReasonController@index');
    // get all routes for services
    Route::get('service', 'Service\ServiceController@index');
    Route::get('service/{id}', 'Service\ServiceController@single');
    // get all routes for condition treated
    Route::get('condition-treated', 'ConditionTreated\ConditionTreatedController@index');
     //   get all routes for faqs
    Route::get('faq', 'Faq\FaqController@index');
    Route::get('faq/{id}', 'Faq\FaqController@single');
    Route::get('requestlead/list', 'RequestLeads\RequestLeadController@index');
Route::get('rejection-reason/{id}', 'RejectionReason\RejectionReasonController@single');
Route::get('condition-treated/{id}', 'ConditionTreated\ConditionTreatedController@single');

