<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\Image\Add;
use App\Http\Requests\User\Image\Delete;
use Illuminate\Http\Request;
use App\Models\UserImage;
use App\Models\UserImageApproval;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Helpers\Helper;
use File;
use App\Models\User\User;

use Illuminate\Support\Facades\Storage;
class ImageController extends Controller

{
    protected $UserImageObject = null;
    // ================= 
public function __construct(UserImage $UserImageObject){
    $this->UserImageObject = $UserImageObject;
}
   // add new user video
   protected function add(Add $request){
 
    try {
        $ifU=User::find($request->user_id);
        if(isset($ifU) && $ifU->status_id=='4'){
            return UserImageApproval::profileApporval($request);
        }
        $media_object = [
            'system_name' => Helper::random_time(). '.' .$request->file('media')->extension(),
            'real_name' => $request->file('media')->getClientOriginalName(),
            'base_path' => url('/storage/app/public/media/'),
            'alt_name' => null,
            'extension' => $request->file('media')->extension(),
            'size' => $request->file('media')->getSize(),
            'description' => null,
            'user_id' => $request->user_id
        ];
        $destination_path = public_path('media');
        $request->file('media')->storeAs('media',$media_object['system_name']);
        DB::beginTransaction();
        $images=UserImage::create($media_object);
        DB::commit();
        return Helper::successResponse('User Image Added Successfully', $images);
    }catch (\Exception $ex) {
        DB::rollback();
        return Helper::serverErrorResponse($ex->getMessage());
    }
}

public function imgDelApproval(Delete $request){
    $ids = $request->input('ids');
    try {
        $Fobj=UserImageApproval::where('id',$ids)->first();
        if(isset($Fobj->system_name)){
            Storage::delete('media/'.$Fobj->system_name);
        }
        UserImageApproval::where('id',$ids)->first()->delete();
        return Helper::successResponse('Images Deleted successfully');
    } catch (\Exception $ex) {
        return Helper::serverErrorResponse($ex->getMessage());
    }
}
    public function delete(Delete $request)
    {
        $ids = $request->input('ids');
        try {
            $Fobj=UserImage::where('id',$ids)->first();
            if(isset($Fobj->system_name)){
                Storage::delete('media/'.$Fobj->system_name);
            }
            UserImage::where('id',$ids)->first()->delete();
            return Helper::successResponse('User Images Deleted successfully');
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
// get single user video
public function single($id){

    try {
        $UserImage = UserImage::where('user_id',$id)->get();
        if(!$UserImage){
            return Helper::notfoundresponse('we can\'t find a user video with that id.');
        }
        return Helper::successresponse('single user video information.', $UserImage);
    } catch (\exception $ex) {
        return Helper::servererrorresponse($ex->getmessage());
    }
}
public function singleApproval($id){

    try {
        $UserImage = UserImageApproval::where('user_id',$id)->get();
        if(!$UserImage){
            return Helper::notfoundresponse('we can\'t find a user video with that id.');
        }
        return Helper::successresponse('single user video information.', $UserImage);
    } catch (\exception $ex) {
        return Helper::servererrorresponse($ex->getmessage());
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
