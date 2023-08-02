<?php

namespace App\Http\Controllers\Master\RejectionReason;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\RejectionReason\Add;
use App\Http\Requests\Master\RejectionReason\Delete;
use App\Http\Requests\Master\RejectionReason\Edit;
use App\Models\Master\RejectionReason\RejectionReason;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RejectionReasonController extends Controller{

    protected $rejectionReason = null;

    public function __construct(RejectionReason $rejectionReason){

        $this->rejectionReason = $rejectionReason;
    }

    // get all rejection reason
    public function index(Request $request){

        try {

            $rejectionReason = RejectionReason::query();

            $search = $request->input('search'); // general search on all fields
            $rejectionReason = $rejectionReason->when($search, function ($query, $search) {
                return $query->where('name', 'like', '%' . $search   . '%')
                    ->orWhere('slug', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%');
            });

            return Helper::successResponse('Rejection Reason list', $rejectionReason, $request);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // add new rejection reason
    public function add(Add $request){

        try {

            $dataArr = $request->only($this->rejectionReason->getFillable());
            $rejectionReason = $this->rejectionReason->create($dataArr);

            DB::commit();
            return Helper::successResponse('Rejection Reason added successfully', $rejectionReason);
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // get any single rejection reason
    public function single($id){

        try {
            $rejectionReason = $this->rejectionReason->find($id);
            if(!$rejectionReason){
                return Helper::notFoundResponse('We can\'t find a Rejection Reason with that id.');
            }
            return Helper::successResponse('Single Rejection Reason Information.', $rejectionReason);
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // edit any rejection reason
    public function edit(Edit $request){

        try {
            $updateRejectionReason = RejectionReason::find($request->input('id'));
            $updateRejectionReason->name = $request->input('name') ? $request->input('name') : $updateRejectionReason->name;
            $updateRejectionReason->description = $request->input('description') ? $request->input('description') : $updateRejectionReason->description;
            $updateRejectionReason->updated_by = Auth::id();
            $updateRejectionReason->save();

            return Helper::successResponse('Rejection Reason updated successfully', $updateRejectionReason);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // delete multiple rejection reason
    public function delete(Delete $request){

        try {

            $this->rejectionReason->whereIn('id', $request->input('ids'))->delete();
            return Helper::successResponse('Rejection Reason deleted Successfully.');

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
}
