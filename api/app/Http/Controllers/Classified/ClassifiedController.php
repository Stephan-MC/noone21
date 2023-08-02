<?php

namespace App\Http\Controllers\Classified;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Classified\Add;
use App\Models\Classified\Classified;
use App\Models\Classified\ClsicMedia;
use App\Helpers\Helper;

class ClassifiedController extends Controller
{
    protected $ClassifiedObject = null;

    public function __construct(Classified $ClassifiedObject){
        $this->ClassifiedObject = $ClassifiedObject;
    }
    public function index(Request $request){

        try {
            $validated = $request->validate([
                'active_jwt_token' => 'required|exists:users',
            ]);
            $classified = Classified::search($request);
            if(isset($request->id) && isset($request->active_jwt_token)){
              return Helper::successResponse('Classified list', $classified);
            }else{
                // return Helper::SuccResWget('Classified list', $classified,$request);
                return Helper::successResponse('Classified list', $classified,$request);
            }

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
    public function GetAll(Request $request){

        try {
           
            $classified = Classified::searchAll($request);
            return Helper::successResponse('Classified list', $classified,$request);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
    public function GetSingle(Request $request){
        try {
            $data = Classified::GetSingleData($request);
            return Helper::successResponse('Post has been create to Aprroval', $data);
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
    public function add(Add $request){
        $images=[];
      
        try {
            DB::beginTransaction();
            $requestData = $request->only($this->ClassifiedObject->getFillable());
            $clisId = Classified::create($requestData)->id;
            if(isset($clisId)){
                for ($i=1; $i < 5; $i++) { 
                    $image= $request->file('imag'.$i);
                    if(isset($image)){
                        ClsicMedia::store($image,$clisId,$request->user_id);
                    }
                }
            }
           
            db::commit();
            return Helper::successResponse('Post has been create to Aprroval', $clisId);
        } catch (\Exception $ex) {
            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
    public function edit(Add $request){
        $images=[];
        try {
            DB::beginTransaction();
            $requestData = $request->only($this->ClassifiedObject->getFillable());
            $model = Classified::find($request->id);
            $clisId = $model->fill($requestData)->save();
            db::commit();
            return Helper::successResponse('Post has been create to Aprroval', $clisId);
        } catch (\Exception $ex) {
            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
  
    public function delete(Request $request){
        $images=[];
        try {
            $model = Classified::find($request->id);
            $medias=ClsicMedia::where('classified_id',$request->id)->get();
         
            foreach ($medias as $key => $val) {
                if(isset($val->system_name)){
                    \Storage::delete('postMedia/'.$model->system_name);
                }
                 ClsicMedia::find($val->id)->delete();
            }
            $model->delete();
            db::commit();
            return Helper::successResponse('Post has been delete');
        } catch (\Exception $ex) {
            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
}
