<?php

namespace App\Http\Controllers\User;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\Approval\Add;
use App\Models\User\UserApproval;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\ApprovalEmail as ApproveUser;
use App\Models\User\ProfileApproval;
use App\Models\UserImageApproval;
use App\Models\UserImage;
use App\Models\UserVideo;
use App\Models\UserVideoApproval;
use App\Models\User\UserEducationApproval;
use App\Models\User\UserEducation;
class UserApprovalController extends Controller{

    protected $userApproval = null;

    public function __construct(UserApproval $userApproval){
        $this->userApproval = $userApproval;
    }
    // ======================= User Profile Approval
    protected function publishedPorfile(Request $request){
        $id=$request->id;
        try {
            $data=ProfileApproval::find($id);
            if(isset($data)){
                $res=ProfileApproval::profileApporvalPublished($data);
                if($res==1){
                    $data->delete();
                    return helper::successresponse('Profile has been Published',Null);
                }else{
                    return Helper::serverErrorResponse('Profile can not Published');
                }
            }
            return Helper::successresponse('No More Reviews To Published');
        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }

    }
// ============================= User Images Approval
protected function publishedGalary(Request $request){
    $id=$request->id;
    try {
        $Uimg=UserImageApproval::where('user_id',$id)->get();
        if(isset($Uimg[0]->id)){
                foreach ($Uimg as $key => $img) {
                    $Model=UserImage::find($img->id); 
                    if(isset($Model)){ $ImgModel=$Model;}else{ $ImgModel=new UserImage; }
                    $ImgModel->real_name=$img->real_name ? $img->real_name : $ImgModel->real_name;
                    $ImgModel->system_name=$img->system_name ? $img->system_name : $ImgModel->system_name;
                    $ImgModel->base_path=$img->base_path ? $img->base_path : $ImgModel->base_path;
                    $ImgModel->alt_name=$img->alt_name ? $img->alt_name : $ImgModel->alt_name;
                    $ImgModel->extension=$img->extension ? $img->extension : $ImgModel->extension;
                    $ImgModel->size=$img->size ? $img->size : $ImgModel->size;
                    $ImgModel->description=$img->description ? $img->description : $ImgModel->description;
                    $ImgModel->user_id=$img->user_id ? $img->user_id : $ImgModel->user_id;
                    $ImgModel->updated_at = now();
                    $ImgModel->save();
                    UserImageApproval::where('id',$img->id)->first()->delete();
                }
                return Helper::successresponse('Profile image has been published');
             }else{
                return Helper::successresponse('No More Reviews to published');
             }
       
        
           
        }
     catch (\Exception $ex) {

        return Helper::serverErrorResponse($ex->getMessage());
    }

}
// ============================= User Videos Apporval
protected function publishedVideos(Request $request){
    $id=$request->id;
    try {
        $Uvid=UserVideoApproval::where('user_id',$id)->get();
     
        if(isset($Uvid[0]->id)){
                foreach ($Uvid as $key => $vid) {
                    $Model=UserVideo::find($vid->id); 
                    if(isset($Model)){ $vidModel=$Model;}else{ $vidModel=new UserVideo; }
                    $vidModel->title=$vid->title ? $vid->title : $vidModel->title;
                    $vidModel->description=$vid->description ? $vid->description : $vidModel->description;
                    $vidModel->video_link=$vid->video_link ? $vid->video_link : $vidModel->video_link;
                    $vidModel->user_id=$vid->user_id ? $vid->user_id : $vidModel->user_id;
                    $vidModel->updated_at = now();
                    $vidModel->save();
                    UserVideoApproval::where('id',$vid->id)->first()->delete();
                }
                return Helper::successresponse('Profile Videos has been published');
             }else{
                return Helper::successresponse('No More Reviews to published');
             }
       
        
           
        }
     catch (\Exception $ex) {

        return Helper::serverErrorResponse($ex->getMessage());
    }


}
// ============================= User Myworks Approval
protected function publishedMyworks(Request $request){
    $id=$request->id;
    try {
        $UApproval=UserEducationApproval::where('user_id',$id)->get();
        
        if(isset($UApproval[0]->id)){
                foreach ($UApproval as $key => $UA) {
                    $Model=UserEducation::where('id',$UA->model_id)->first(); 
                    if(isset($Model)){ $EduModel=$Model;}else{ $EduModel=new UserEducation; }
                    $EduModel->title=$UA->title ? $UA->title : $EduModel->title;
                    $EduModel->start_date=$UA->start_date ? $UA->start_date : $EduModel->start_date;
                    $EduModel->end_date=$UA->end_date ? $UA->end_date : $EduModel->end_date;
                    $EduModel->details=$UA->details ? $UA->details : $EduModel->details;
                    $EduModel->institute=$UA->institute ? $UA->institute : $EduModel->institute;
                    $EduModel->education_type_id=$UA->education_type_id ? $UA->education_type_id : $EduModel->education_type_id;
                    $EduModel->user_id=$UA->user_id ? $UA->user_id : $EduModel->user_id;
                    $EduModel->updated_at = now();
                    $EduModel->save();
                    UserEducationApproval::where('model_id',$UA->model_id)->first()->delete();
                }
                return Helper::successresponse('Mywork has been published');
             }else{
                return Helper::successresponse('No More Reviews to published');
             }
       
        
           
        }
     catch (\Exception $ex) {

        return Helper::serverErrorResponse($ex->getMessage());
    }


}
    // add new user Approval
    protected function add(Add $request){
        try {

            $dataArr = $request->only($this->userApproval->getFillable());
            $dataArr['created_by'] = Auth::id();
            $userApproval = $this->userApproval->create($dataArr);
            $userApprovalObject = UserApproval::with('user', 'rejection_reasons', 'created_by')->find($userApproval->id);
            // update user status while adding approvals
            DB::table('users')->where('id', $userApprovalObject->user_id)->update(['status_id' => $request->input('status_id')]);
            DB::commit();
            Mail::to($request->email)->send(new ApproveUser($request->all()));
            return Helper::successResponse('User Approval added successfully', $userApprovalObject);
           
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // get single userApproval
    public function single($id){
        try {
            $userApprovals = UserApproval::with('user', 'rejection_reasons', 'created_by')->find($id);

            if(!$userApprovals){
                return helper::notfoundresponse('we can\'t find a user approval with that id.');
            }
            return helper::successresponse('single user approval review information.', $userApprovals);
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // get user Approval with filters
    public function index(request $request){
        try {

            $consultation = UserApproval::search($request);
            return helper::successresponse('user consultation searched list.',$consultation, $request);

        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

}
