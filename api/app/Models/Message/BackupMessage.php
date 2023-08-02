<?php

namespace App\Models\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\Helpers\Helper;
class Message extends Model
{
  protected $fillable = [
    'sender_id' , 'reciver_id' , 'user_id' , 'msg_token' , 'subject',  'message' , 
    'to' ,     'from'  ,   'created_at' ,'updated_at' , 'msg_type'  
];
public static function getMsgSingle($request){
  if($request->conId && $request->authId){
        $auth_id=$request->authId;
        $user_id=$request->conId;
  }else{
    return Helper::serverErrorResponse('error');
  }
   
    try {
            $msgHistory=[];
            $message = DB::table('messages');
            $message=$message->select('messages.*','u.id as userId','u.email as userEmail',DB::raw("CONCAT(u.first_name,' ',u.last_name) AS username"));
            $message=$message->where('sender_id',$auth_id);
            $message=$message->join('users as u','u.id','=','messages.reciver_id');
            $message=$message->orderBy('created_at', 'ASC');
            $message=$message->where('reciver_id',$user_id);
            $sentMsg=$message->get();
            $message = DB::table('messages');
            $message=$message->where('sender_id',$user_id);
            $message=$message->select('messages.*','u.id as userId','u.email as userEmail',DB::raw("CONCAT(u.first_name,' ',u.last_name) AS username"));
            $message=$message->join('users as u','u.id','=','messages.sender_id');
            $message=$message->where('reciver_id',$auth_id);
            $message=$message->orderBy('created_at', 'ASC');
            $recivedMsge=$message->get();
            $Tlenth='';
            if($sentMsg->count()>$recivedMsge->count()){
              $Tlenth=$sentMsg->count();
            }else{
              $Tlenth=$recivedMsge->count();
            }

        for ($i=0; $i<$Tlenth; $i++) {
                  if(!isset($sentMsg[$i])){
                    array_push($msgHistory,['type'=>1,'data'=>'']);
                  } 
                  if(!isset($recivedMsge[$i])){
                    array_push($msgHistory,['type'=>2,'data'=>'']);
                  }
                  if(isset($recivedMsge[$i])){
                    array_push($msgHistory,['type'=>2,'data'=>$recivedMsge[$i]]);
                  }
                  if(isset($sentMsg[$i])){
                    array_push($msgHistory,['type'=>1,'data'=>$sentMsg[$i]]);
                  }
                 
            }
            return $msgHistory;
    }catch (\Exception $ex) {

      return Helper::serverErrorResponse($ex->getMessage());
      }
   //  return $msgHistory;
   }
   
public static function getMsg($request){
  try {
  
    
          if(isset($request->authID)){
            $auth_id=$request->authID;
          }else{
            return Helper::serverErrorResponse($ex->getMessage());
          }
      //==================================== get all user conversion 
      $echData=['ressult'=>'adl','pak'=>'akdfasd'];
      $data=[];
     
      $databa=DB::table('messages as ms')
            ->orderBy('id')
            ->where('reciver_id',$auth_id)
            ->orwhere('sender_id',$auth_id)
            ->groupBy('msg_token')->get();
     foreach ($databa as $key => $val) {
      $u=DB::table('users as u');
       if($val->reciver_id==$auth_id)
            {$u=$u->where('u.id',$val->sender_id);
         }else{
                $u=$u->where('u.id',$val->reciver_id);
         }
            
              $u=$u->select('u.id as userId','u.email as userEmail',
                DB::raw("CONCAT(u.first_name,' ',u.last_name) AS username"),'u.created_at as join_date','med.system_name','med.base_path');
              $u=$u->join('media as med','med.id','=','u.profile_media_id');
                $u=$u->first();
                if($u){
                  array_push($data,$u);
                }
        
     }
     return $data;
      $message = DB::table('messages as ms');
      $message=$message->select('ms.*','u.id as userId','u.email as userEmail',
      DB::raw("CONCAT(u.first_name,' ',u.last_name) AS username"),'u.created_at as join_date','med.system_name','med.base_path');
      $message=$message->where('reciver_id',$auth_id);
      // $message=$message->where('u.id','!=',$auth_id);
      $message=$message->orwhere('sender_id',$auth_id);
      $message=$message->join('users as u','u.id','=','ms.reciver_id');
      $message=$message->join('media as med','med.id','=','u.profile_media_id');
      $message=$message->groupBy('msg_token');
      $message=$message->orderBy('ms.created_at','desc');
      // $message=$message->take($per_page)->skip((($page - 1) * $per_page));
      echo "<Pre>";
      print_r($message->get());
      die();
         $conversion=$message->get();
         return $conversion;
  } catch (\Exception $ex) {

      return Helper::serverErrorResponse($ex->getMessage());
  }

     

   }
}
