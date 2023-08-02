<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// media routes
Route::post('/add', 'MediaController@add');
Route::post('/tempMedia/add', 'TempMediaController@add');
