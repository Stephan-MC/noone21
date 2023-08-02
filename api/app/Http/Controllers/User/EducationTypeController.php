<?php

namespace App\Http\Controllers\User;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\User\EducationType;
use Illuminate\Http\Request;

class EducationTypeController extends Controller{

    // get all education types
    public function index(Request $request){

        $educationTypes = EducationType::all();
        return Helper::successResponse('All Education Types', $educationTypes);
    }
}
