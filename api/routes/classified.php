<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//==================================================== simple user routes
Route::group(['middleware' => ['auth:api','role:Vendor']], function () {
    Route::post('post/add', 'ClassifiedController@add');
    Route::post('/post/delete', 'ClassifiedController@delete');
    Route::post('/post/edit', 'ClassifiedController@edit');
    Route::delete('/media/delete', 'MediaController@delelte');
   
});
Route::post('/media/add', 'MediaController@add');
Route::get('post/get', 'ClassifiedController@index');
Route::get('/post/getAll', 'ClassifiedController@GetAll');
Route::get('/post/getSingle', 'ClassifiedController@GetSingle');
//=================================================== all category rout
Route::get('/category/get', 'CategoryController@index');
        
//=================================================== all media rout

