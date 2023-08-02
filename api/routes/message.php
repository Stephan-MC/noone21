<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// Get all user messages history
Route::get('/', 'MessageController@index');
Route::get('/getMsgSingle', 'MessageController@getMsgSingle');
Route::get('/get', 'MessageController@getMsg');
Route::post('/add', 'MessageController@add');
