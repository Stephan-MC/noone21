<?php

namespace App\Http\Controllers\Master\Consultation;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\Consultation\Add;
use App\Http\Requests\Master\Consultation\Delete;
use App\Http\Requests\Master\Consultation\Edit;
use App\Models\Master\Consultation\Consultation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ConsultationController extends Controller{

    protected $consultation = null;

    public function __construct(Consultation $consultation){

        $this->consultation = $consultation;
    }

    // get all sub consultation
    public function index(Request $request){

        try {

            $consultations = Consultation::query();

            $search = $request->input('search'); // general search on all fields
            $consultations = $consultations->when($search, function ($query, $search) {
                return $query->where('name', 'like', '%' . $search   . '%')
                    ->orWhere('slug', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%');
            });

            return Helper::successResponse('Consultation list', $consultations, $request);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // add new consultation
    public function add(Add $request){

        try {

            $dataArr = $request->only($this->consultation->getFillable());
            $consultation = $this->consultation->create($dataArr);
            DB::commit();
            return Helper::successResponse('Consultation added successfully', $consultation);
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // get any single consultation
    public function single($id){

        try {
            $consultation = $this->consultation->find($id);
            if(!$consultation){
                return Helper::notFoundResponse('We can\'t find a consultation with that id.');
            }
            return Helper::successResponse('Single Consultation Information.', $consultation);
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
    // edit any consultation
    public function edit(Edit $request){
        try {
            $updateConsultation = Consultation::find($request->input('id'));
            $updateConsultation->name = $request->input('name') ? $request->input('name') : $updateConsultation->name;
            $updateConsultation->description = $request->input('description') ? $request->input('description') : $updateConsultation->description;
            $updateConsultation->updated_by = Auth::id();
            $updateConsultation->save();
            return Helper::successResponse('Consultation updated successfully', $updateConsultation);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // delete multiple consultation
    public function delete(Delete $request){

        try {

            $this->consultation->whereIn('id', $request->input('ids'))->delete();
            return Helper::successResponse('Consultations deleted Successfully.');

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

}
