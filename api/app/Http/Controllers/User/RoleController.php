<?php

namespace App\Http\Controllers\User;

use App\Helpers\Helper;
use App\Models\User\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoleController extends Controller{

    // get all roles
    public function index(Request $request){
        $roles = Role::where('id', '>', 2);
        return Helper::successResponse('Roles list', $roles, $request);
    }
}
