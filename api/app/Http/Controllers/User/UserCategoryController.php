<?php

namespace App\Http\Controllers\User;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\Category\Add;
use App\Http\Requests\User\Category\Delete;
use App\Http\Requests\User\Category\Edit;
use App\Models\User\User;
use App\Models\User\UserCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserCategoryController extends Controller{

    protected $userCategory = null;

    public function __construct(UserCategory $userCategory){
        $this->userCategory = $userCategory;
    }

    // add new user category
    protected function add(Add $request){

        try {

            foreach ($request->input('sub_category_ids') as $sub_category_id){
                $userCategory = array();
                $ifExist=UserCategory::where('sub_category_id',$sub_category_id);
                $ifExist=$ifExist->where('category_id',$request->input('category_id'));
                $ifExist=$ifExist->where('user_id',$request->input('user_id'));
                $ifExist=$ifExist->first();
                if(isset($ifExist)){
                    return helper::servererrorresponse('Subcategory already exist');
                }
              if(!isset($ifExist)){
                    $userCategory['user_id']  = $request->input('user_id');
                    $userCategory['category_id'] = $request->input('category_id');
                    $userCategory['sub_category_id'] = $sub_category_id;
                    $userCategory['created_by'] = Auth::id();
                    $userCategory['created_at'] = now();
                    $userCategories[] = $userCategory;
              }
             
            }

            UserCategory::insert($userCategories);

            $user = User::SingleUser($request->input('user_id'));

            return Helper::successresponse('user Categories added successfully', $user);

        } catch (\exception $ex) {

            DB::rollback();
            return helper::servererrorresponse($ex->getmessage());
        }

    }

    // get single user category
    public function single($id){
        try {
            $userCategory = UserCategory::with('category', 'sub_categories')->find($id);
            if(!$userCategory){
                return helper::notfoundresponse('we can\'t find a user category with that id.');
            }
            return helper::successresponse('single user category information.',$userCategory);
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // edit any user category
    public function edit(Edit $request){

        db::begintransaction();
        try {

            //first delete previous sub categories
            DB::table('user_categories')->where(['user_id' => $request->input('user_id'), 'category_id' => $request->input('category_id')])->delete();

            foreach ($request->input('sub_category_ids') as $sub_category_id){
                $userCategory = array();
                $userCategory['user_id']  = $request->input('user_id');
                $userCategory['category_id'] = $request->input('category_id');
                $userCategory['sub_category_id'] = $sub_category_id;
                $userCategory['created_by'] = Auth::id();
                $userCategory['created_at'] = now();
                $userCategories[] = $userCategory;
            }

            UserCategory::insert($userCategories);

            $user = User::SingleUser($request->input('user_id'));

            db::commit();
            return helper::successresponse('user categories updated successfully', $user);

        } catch (\exception $ex) {

            db::rollback();
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // delete any user category
    public function delete(Delete $request){

        DB::table('user_categories')->where(['user_id' => $request->input('user_id'), 'category_id' => $request->input('category_id')])->delete();
        return helper::successresponse('user consultation deleted successfully');
    }
    public function deleteUserCat(Request $request){
        try {

            DB::table('user_categories')->where(['user_id' => $request->input('user_id'), 'sub_category_id' => $request->input('subcat_id')])->delete();
            return helper::successresponse('User Category Deleted Successfully');

        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
       
    }
    // get user category with filters
    public function index(request $request){
        try {

            $consultation = UserCategory::search($request);
            return helper::successresponse('user consultation searched list.',$consultation, $request);

        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

}
