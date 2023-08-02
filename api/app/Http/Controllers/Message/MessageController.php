<?php

namespace App\Http\Controllers\Message;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Message\Add;
use App\Models\Message\Message;
use App\Helpers\Helper;
use Illuminate\Support\Facades\Auth;
class MessageController extends Controller
{
    protected $MessageObj = null;

    public function __construct(Message $MessageObj){
        $this->MessageObj = $MessageObj;
    }
    public function index(Request $request){
        return $this->MessageObj::getMsgSingle($request);
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
    public function getMsgSingle(Request $request){
     
        return $this->MessageObj::getMsgSingle($request);
    }
    public function getMsg(Request $request){
       
        return $this->MessageObj::getMsg($request);
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
    public function add(Add $request){
        try {
            DB::beginTransaction();
            $data=[];
            $array=[];
            $data['msg_token']=$request->sender_id+$request->reciver_id;
            $data['user_id']=$request->sender_id;
            $storData=array_merge($data,$request->all());
            $message=Message::create($storData);
            DB::commit();
            return Helper::successResponse('Message has been sent');
        } catch (\Exception $ex) {
            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
      
    }
}
