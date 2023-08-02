<?php

namespace App\Http\Controllers\Classified;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Classified\ClsicCategory;
use App\Helpers\Helper;
class CategoryController extends Controller
{
    public function index(){
        try {
            $category=ClsicCategory::All();
            return Helper::successResponse('get category', $category);
        } catch (JWTException $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
        
    }
}
