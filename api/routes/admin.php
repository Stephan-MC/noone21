<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// simple user routes
Route::get('page/get', 'PageController@GetAll');
Route::get('page/getPageType', 'PageController@GetPageType');
Route::get('page/getSingle', 'PageController@getSingle');
Route::get('content/getsingle', 'ContentController@GetSingle');
Route::get('dynamicPage/get', 'PageController@GetDynamicPage');

Route::group(['middleware' => ['auth:api','role:SuperAdmin']], function () {
    //========================User===============================================
      Route::post('approval/published-profile', 'UserApprovalController@publishedPorfile');
      Route::post('approval/published-galary', 'UserApprovalController@publishedGalary');
      Route::post('approval/published-videos', 'UserApprovalController@publishedVideos');
      Route::post('approval/published-myworks', 'UserApprovalController@publishedMyworks');
      //--------------------- Page Builder Routing-----------------
      Route::post('page/add', 'PageController@Add');
      Route::put('page/edit', 'PageController@Edit');
      Route::post('page/delete', 'PageController@Delete');
      Route::post('page/content/add', 'ContentController@Add');
     
      Route::delete('page/content/delete', 'ContentController@Delete');
    });
   