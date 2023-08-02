<?php

namespace App\Http\Controllers\Master\ConditionTreated;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\ConditionTreated\Add;
use App\Http\Requests\Master\ConditionTreated\Delete;
use App\Http\Requests\Master\ConditionTreated\Edit;
use App\Models\Master\ConditionTreated\ConditionTreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ConditionTreatedController extends Controller{

    protected $conditionTreated = null;

    public function __construct(ConditionTreated $conditionTreated){

        $this->conditionTreated = $conditionTreated;
    }

    // get all condition treated
    public function index(Request $request){

        try {

            $conditionTreated = ConditionTreated::query();
            $search = $request->input('search'); // general search on all fields
            $conditionTreated = $conditionTreated->when($search, function ($query, $search) {
                return $query->where('name', 'like', '%' . $search   . '%')
                    ->orWhere('slug', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%');
            });
            return Helper::successResponse('Condition treated list', $conditionTreated, $request);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // add new condition treated
    public function add(Add $request){

        try {
            $dataArr = $request->only($this->conditionTreated->getFillable());
            $conditionTreated = $this->conditionTreated->create($dataArr);
            DB::commit();
            return Helper::successResponse('Condition treated added successfully', $conditionTreated);
        }catch (\Exception $ex) {
            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // get any single condition treated
    public function single($id){

        try {
            $service = $this->conditionTreated->find($id);
            if(!$service){
                return Helper::notFoundResponse('We can\'t find a condition treated with that id.');
            }
            return Helper::successResponse('Single condition treated Information.', $service);
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // edit any condition treated
    public function edit(Edit $request){

        try {
            $updateConditionTreated = ConditionTreated::find($request->input('id'));
            $updateConditionTreated->name = $request->input('name') ? $request->input('name') : $updateConditionTreated->name;
            $updateConditionTreated->description = $request->input('description') ? $request->input('description') : $updateConditionTreated->description;
            $updateConditionTreated->updated_by = Auth::id();
            $updateConditionTreated->save();

            return Helper::successResponse('Category updated successfully', $updateConditionTreated);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // delete multiple condition treated
    public function delete(Delete $request){

        try {

            $this->conditionTreated->whereIn('id', $request->input('ids'))->delete();
            return Helper::successResponse('Condition Treated deleted Successfully.');

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
}
