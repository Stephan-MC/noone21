<?php

namespace App\Http\Controllers\Classified;
use App\Models\Classified\ClsicMedia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\Helper;

class MediaController extends Controller
{
    public function index(Request $request){

        try {
            $validated = $request->validate([
                'active_jwt_token' => 'required|exists:users',
            ]);
            $classified = Classified::search($request);
            if(isset($request->id) && isset($request->active_jwt_token)){
              return Helper::successResponse('Classified list', $classified);
            }else{
                return Helper::successResponse('Classified list', $classified,$request);
            }

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
    public function delelte(Request $request){
        $images=[];
        $ids = $request->input('id');
        try {
            $validated = $request->validate([ 'active_jwt_token' => 'required|exists:users']);
            $Fobj=ClsicMedia::where('id',$ids)->first();
           
            if(isset($Fobj->system_name)){
                \Storage::delete('postMedia/'.$Fobj->system_name);
            }
            ClsicMedia::where('id',$ids)->first()->delete();
            return Helper::successResponse('User Images Deleted successfully');
        }catch (\Exception $ex) {

        }
           
       
    }
    public function add(Request $request){
        $images=[];
       
        try {
            $validated = $request->validate(
                [ 'active_jwt_token' => 'required|exists:users',
                'id' => 'required|exists:classifieds',
                'user_id'=>'required|exists:classifieds',
                'media'=>'required|mimes:jpeg,jpg,png,gif|max:10000',
                ]
            
            );
            $Fobj=ClsicMedia::where('id',$request->id)->first();
            ClsicMedia::store($request->media,$request->id,$request->user_id);
            return Helper::successResponse('Post Images Added Successfully');
        }catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
           
       
    }
}
