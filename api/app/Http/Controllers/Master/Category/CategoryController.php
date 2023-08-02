<?php

namespace App\Http\Controllers\Master\Category;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\Category\Add;
use App\Http\Requests\Master\Category\Delete;
use App\Http\Requests\Master\Category\Edit;
use App\Models\Master\Category\Category;
use App\Models\User\UserCategory;
use App\Models\Master\Category\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller{

    protected $category = null;

    public function __construct(Category $category){

        $this->category = $category;
    }

    // get all categories
    
    public function getUserCategory(Request $request){
       
        try {
            $userId = $request->input('user_id');
            $UC = DB::table('user_categories as uc')->where([ 'user_id' => $userId ]);
            $UC = $UC->join('categories', 'uc.category_id', '=', 'categories.id');
            $UC = $UC->select('categories.name as category', 'categories.id as categoryId','uc.user_id');
            $UC =$UC->groupBy('category_id')->get();
            foreach ($UC as $category){
                $category->sub_category = DB::table('user_categories as ucs')->join('sub_categories', 'ucs.sub_category_id', '=', 'sub_categories.id');
                $category->sub_category =$category->sub_category->select('sub_categories.name as subcategory','sub_categories.id as subCategoryId','ucs.user_id');
                $category->sub_category =$category->sub_category->where('user_id',$userId);
                $category->sub_category =$category->sub_category->where('ucs.category_id',$category->categoryId)->get();
            }
            return Helper::successResponse('Categories list', $UC, $request=null);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
    public function index(Request $request){

        try {

            $categories = Category::with('media');

            $search = $request->input('search'); // general search on all fields
            $categories = $categories->when($search, function ($query, $search) {
                return $query->where('name', 'like', '%' . $search   . '%')
                    ->orWhere('slug', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%');
            });

            $isHome = $request->input('is_home'); // general search on all fields
            $categories = $categories->when($isHome, function ($query, $isHome) {
                return $query->where('is_home', $isHome);
            });

            return Helper::successResponse('Categories list', $categories, $request);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // add new category
    public function add(Add $request){

        try {

            $dataArr = $request->only($this->category->getFillable());
            $category = $this->category->create($dataArr);

            $categoryObject = Category::with('media')->find($category->id);
            DB::commit();

            return Helper::successResponse('Category added successfully', $categoryObject);
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // get any single category
    public function single($id){

        try {
            $category = Category::with('media')->find($id);
            if(!$category){
                return Helper::notFoundResponse('We can\'t find a Cateogry with that id.');
            }
            return Helper::successResponse('Single Category Information.', $category);
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // edit any Category
    public function edit(Edit $request){

        try {
            $updateCategory = Category::find($request->input('id'));
            $updateCategory->name = $request->input('name') ? $request->input('name') : $updateCategory->name;
            $updateCategory->description = $request->input('description') ? $request->input('description') : $updateCategory->description;
            $updateCategory->updated_by = Auth::id();
            $updateCategory->is_home = $request->input('is_home');
            $updateCategory->media_id = $request->input('media_id') ? $request->input('media_id') : $updateCategory->media_id;
            $updateCategory->save();
            $categoryObject = Category::with('media')->find($updateCategory->id);

            return Helper::successResponse('Category updated successfully', $categoryObject);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // delete multiple Categories
    public function delete(Delete $request){

        try {

            $this->category->whereIn('id', $request->input('ids'))->delete();
            return Helper::successResponse('Categories deleted Successfully.');

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // get all categories with sub categories
    public function all(Request  $request){

        try {
            $isHome = $request->input('is_home');
            if($isHome=='1'){
                $categories = Category::with('media')
                ->where('deleted_at', null)
                ->where('is_home', $isHome)
                ->get();
            }else{
                $categories = Category::with('media')
                ->where('deleted_at', null)
                ->get();
            }
            
            foreach ($categories as $category){
                $category->sub_categories = SubCategory::where('category_id', $category->id)->get();
            }

            return Helper::successResponse('Categories list', $categories);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

}
