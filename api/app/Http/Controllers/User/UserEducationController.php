<?php

namespace App\Http\Controllers\User;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\Education\Add;
use App\Http\Requests\User\Education\Delete;
use App\Http\Requests\User\Education\Edit;
use App\Models\User\User;
use App\Models\User\UserEducation;
use App\Models\User\UserEducationApproval;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserEducationController extends Controller{

    protected $userEducationObject = null;

    public function __construct(UserEducation $userEducationObject){
        $this->userEducationObject = $userEducationObject;
    }

    // Add new user education
    protected function add(Add $request){

        try {
            $ifApp=User::find($request->input('user_id'));
            if(isset($ifApp->status_id) && $ifApp->status_id=='4'){
                $requestData = $request->only($this->userEducationObject->getFillable());
                $mid=UserEducationApproval::create($requestData)['id'];
                $m=UserEducationApproval::where('id',$mid)->first();
                $m->model_id=$mid;
                $m->save();
               
            }else{
                $requestData = $request->only($this->userEducationObject->getFillable());
                UserEducation::create($requestData);
            }
            $user = User::SingleUser($request->input('user_id'));
            return Helper::successResponse('User Education Added Successfully', $user);

        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // get single User Education
    public function single($id){
        try {
            $userEducation = $this->userEducationObject::find($id);
            if(!$userEducation){
                return Helper::notFoundResponse('We can\'t find a User Education with that id.');
            }
            return Helper::successResponse('Single User Education Information.',$userEducation);
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // edit any User Education
    public function edit(Edit $request){

        DB::beginTransaction();
        try {
            $ifApp=User::find($request->input('user_id'));
            if(isset($ifApp->status_id) && $ifApp->status_id=='4'){
                
                $updateUserEducation = UserEducationApproval::where('model_id',$request->input('id'))->first();
                if(!isset($updateUserEducation)){
                    $updateUserEducation=new UserEducationApproval;
                }
                $updateUserEducation->model_id=$request->input('id');
               
            }else{
                $updateUserEducation = UserEducation::find($request->input('id'));
            }
           
            // $updateUserEducation = UserEducation::find($request->input('id'));
            $updateUserEducation->title = $request->input('title') ? $request->input('title') : $updateUserEducation->title;
            $updateUserEducation->user_id = $request->input('user_id') ? $request->input('user_id') : $updateUserEducation->user_id;
            $updateUserEducation->start_date = $request->input('start_date') ? $request->input('start_date') : $updateUserEducation->start_date;
            $updateUserEducation->end_date = $request->input('end_date') ? $request->input('end_date') : $updateUserEducation->end_date;
            $updateUserEducation->details = $request->input('details') ? $request->input('details') : $updateUserEducation->details;
            $updateUserEducation->institute = $request->input('institute') ? $request->input('institute') : $updateUserEducation->institute;
            $updateUserEducation->institute = $request->input('institute') ? $request->input('institute') : $updateUserEducation->institute;
            $updateUserEducation->education_type_id = $request->input('education_type_id') ? $request->input('education_type_id') : $updateUserEducation->education_type_id;
            $updateUserEducation->updated_by = Auth::id();
            $updateUserEducation->save();

            DB::commit();
         
            $user = User::SingleUser($request->input('user_id'));

            return Helper::successResponse('User Education updated successfully', $user);

        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // delete any User education
    public function delete(Delete $request)
    {
        $ids = $request->input('ids');
        try {
            $this->userEducationObject->whereIn('id',$ids)->delete();
            return Helper::successResponse('User Education Deleted successfully');
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // get user education with filters
    public function index(Request $request){
        try {

            $attorney = $this->userEducationObject::search($request);
            return Helper::successResponse('User Education Searched List.',$attorney, $request);

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
    public function getApproval(Request $request){
       
        try {
            $edu = DB::table('user_education_approvals as UEA');
            $edu=$edu->join('education_types as ET', 'ET.id', '=', 'UEA.education_type_id')
            ->select('ET.name as edutype', 'UEA.*');
            // $attorney = $this->userEducationObject::search($request);
            return Helper::successResponse('User Education Searched List.',$edu, $request);

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
    public function delapproval(Request $request){
        try {
            $ids = $request->input('ids');
            try {
               $model= UserEducationApproval::where('id','13')->first();
               if(isset($model)){
                    $model->delete();
                    return Helper::successResponse('User Education Deleted successfully');
               }else{
                return Helper::serverErrorResponse('User Education Did Not Deleted successfully');
               }
              
            } catch (\Exception $ex) {
                return Helper::serverErrorResponse($ex->getMessage());
            }
            // return Helper::successResponse('User Education Searched List.',$edu, $request);

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
    
    
}
