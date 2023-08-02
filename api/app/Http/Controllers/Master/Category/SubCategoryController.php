<?php

namespace App\Http\Controllers\Master\Category;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\Category\SubCategory\Add;
use App\Http\Requests\Master\Category\SubCategory\Delete;
use App\Http\Requests\Master\Category\SubCategory\Edit;
use App\Models\Master\Category\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SubCategoryController extends Controller{

    protected $subCategory = null;

    public function __construct(SubCategory $subCategory){

        $this->subCategory = $subCategory;
    }

    // get all sub categories
    public function index(Request $request){

        try {

            $categories = SubCategory::with('category');

            $category_id = $request->input('category_id');
            $categories = $categories->when($category_id, function ($query, $category_id) {
                return $query->where('category_id', $category_id);
            });

            $search = $request->input('search'); // general search on all fields
            $categories = $categories->when($search, function ($query, $search) {
                return $query->where('name', 'like', '%' . $search   . '%');
            });

            return Helper::successResponse('Sub Categories list', $categories, $request);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // add new sub category
    public function add(Add $request){

        try {

            $dataArr = $request->only($this->subCategory->getFillable());
            $subCategory = $this->subCategory->create($dataArr);

            DB::commit();
            return Helper::successResponse('Sub Category added successfully', $subCategory);
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // get any single sub category
    public function single($id){

        try {
            $subCategory = SubCategory::with('category')->find($id);
            if(!$subCategory){
                return Helper::notFoundResponse('We can\'t find a Sub Category with that id.');
            }
            return Helper::successResponse('Single Sub Category Information.', $subCategory);
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // edit any sub Category
    public function edit(Edit $request){

        try {
            $updateSubCategory = SubCategory::find($request->input('id'));
            $updateSubCategory->name = $request->input('name') ? $request->input('name') : $updateSubCategory->name;
            $updateSubCategory->description = $request->input('description') ? $request->input('description') : $updateSubCategory->description;
            $updateSubCategory->category_id = $request->input('category_id') ? $request->input('category_id') : $updateSubCategory->category_id;
            $updateSubCategory->updated_by = Auth::id();
            $updateSubCategory->save();

            return Helper::successResponse('Sub Category updated successfully', $updateSubCategory);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // delete multiple sub Categories
    public function delete(Delete $request){

        try {

            $this->subCategory->whereIn('id', $request->input('ids'))->delete();
            return Helper::successResponse('Sub Categories deleted Successfully.');

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

}
