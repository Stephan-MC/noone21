<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\Helper;
use App\Models\User\User;
use App\Http\Requests\User\video\Add;
use App\Http\Requests\User\video\Approve;
use App\Http\Requests\User\video\Delete;
use App\Http\Requests\User\video\Edit;
use App\Models\UserVideo;
use App\Models\UserVideoApproval;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Validator;

class VideoController extends Controller
{
    protected $UserVideoObject = null;
        // ================= 
    public function __construct(UserVideo $UserVideoObject){
        $this->UserVideoObject = $UserVideoObject;
    }
       // add new user video
       protected function add(Add $request){
        $ifU=User::find($request->user_id);
        if(isset($ifU) && $ifU->status_id=='4'){
            return UserVideoApproval::profileApporval($request);
        }
       
        try {
             $images=$this->UserVideoObject->CreateRecord($request);
            return Helper::successResponse('User Videos Added Successfully', $images);
        }catch (\Exception $ex) {
            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
        public function delete(Delete $request)
        {
            $ids = $request->input('ids');
            try {
                // $Fobj=$this->UserVideoObject->whereIn('id',$ids)->first();
                // if(isset($Fobj->system_name)){
                //     Storage::delete('media/'.$Fobj->system_name);
                // }
                $this->UserVideoObject->whereIn('id',$ids)->delete();
                return Helper::successResponse('User Video Deleted Successfully');
            } catch (\Exception $ex) {
                return Helper::serverErrorResponse($ex->getMessage());
            }
        }
    // get single user video
    public function single($id){

        try {
            $UserVideo = UserVideo::where('user_id',$id)->get();
            if(!$UserVideo){
                return helper::notfoundresponse('we can\'t find a user video with that id.');
            }
            return helper::successresponse('single user video information.', $UserVideo);
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }
    //  User Single Video Approval
    
    public function video_Delete_Approval(Delete $request){
        $ids = $request->input('ids');
        try {
            $model= UserVideoApproval::whereIn('id',$ids)->first();
            if($model){$model->delete();
                return Helper::successResponse('Video Has Been Deleted Successfully');
            }else{
                return Helper::successResponse('Video Did Not Deleted');
            }
           
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
    public function userVideoApproval($id){

        try {
            $UserVideo = UserVideoApproval::where('user_id',$id)->get();
            if(!$UserVideo){
                return helper::notfoundresponse('we can\'t find a user video with that id.');
            }
            return helper::successresponse('single user video information.', $UserVideo);
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }
      // edit any user video
      public function edit(Edit $request){

        DB::begintransaction();
        try {

            $Model = UserVideo::find($request->input('id'));
            $Model->title = $request->input('video');
            $Model->description = $request->input('description');
            $Model->video_link = $request->input('video_link');
            $Model->user_id = Auth::id();
            $Model->updated_at = now();
            $Model->save();
            $userVids = UserVideo::find($request->input('id'));
            DB::commit();
            return helper::successresponse('user video updated successfully', $userVids);

        } catch (\exception $ex) {

            db::rollback();
            return helper::servererrorresponse($ex->getmessage());
        }
    }
   
      // get user video with filters
      public function index(request $request){
        try {

            $consultation = UserVideo::search($request);
            return helper::successresponse('user video searched list.',$consultation, $request);

        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }
}
