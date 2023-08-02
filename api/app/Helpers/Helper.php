<?php

namespace App\Helpers;

class Helper {

    // send validation response
    public static function validationResponse($errors){
        return response()->json(['status' => false, 'message' => $errors, 'result' => array('data' => null)], config('httpstatuscodes.validation'));
    }

    // send un authorized response
    public static function unAuthResponse($errors){
        return response()->json(['status' => false, 'message' => $errors, 'result' => array('data' => null)], config('httpstatuscodes.unauthorized_status'));
    }

    // send internal server error
    public static function serverErrorResponse($errors){
        return response()->json(['status' => false, 'message' => $errors, 'result' => array('data' => null)], config('httpstatuscodes.internal_server_error'));
    }

    // send not found error
    public static function notFoundResponse($errors){
        return response()->json(['status' => false, 'message' => $errors, 'result' => array('data' => null)], config('httpstatuscodes.not_found_status'));
    }
  
    // send success response
public static function successResponseWoGet($message, $data = [], $request = null){
    if ($request != null) {
        if($request->has('pagination') && $request->input('pagination') == 1){
            $data = self::paginatedResponse($request->input('per_page'),$request->input('page'),$data);
            return response()->json(['status' => true, 'message' => $message, 'result' => $data],config('httpstatuscodes.ok_status'));
        }
        else{
            return response()->json(['status' => true, 'message' => $message, 'result' => array('data' => $data)],config('httpstatuscodes.ok_status'));
        }
    } else {
        return response()->json(['status' => true, 'message' => $message, 'result' => array('data' => $data)], config('httpstatuscodes.ok_status'));
    }
}

    public static function successResponse($message, $data = [], $request = null){
        if ($request != null) {
            if($request->has('pagination') && $request->input('pagination') == 1){
                $data = self::paginatedResponse($request->input('per_page'),$request->input('page'),$data);
                return response()->json(['status' => true, 'message' => $message, 'result' => $data],config('httpstatuscodes.ok_status'));
            }
            else{
                return response()->json(['status' => true, 'message' => $message, 'result' => array('data' => $data->get())],config('httpstatuscodes.ok_status'));
            }
        } else {
            return response()->json(['status' => true, 'message' => $message, 'result' => array('data' => $data)], config('httpstatuscodes.ok_status'));
        }
    }

    // check if pagination is required or not
    public static function paginatedResponse($per_page = 20, $page = 1, $object){
        $count =   $object->get()->count();
        $object =  $object->take($per_page)->skip((($page - 1) * $per_page))->get();
        return ['total' => $count, 'data' => $object];
    }

    // make unique user id
    public static function mak_user_unique_id( $userId = null, $firstName = null, $lastName = null ){
        return $userId.'-'. strtoupper(substr($firstName, 0, 3) . substr($lastName, 0, 3)) .'-'. rand(5, 121472) * $userId;
    }

    // get random time
    public static function random_time(){
        $current_time = round(microtime(true)*1000);
        return $current_time . rand(1111,9999);
    }

    // get slug with name
    public static function makeSlug($name = null){
        return $name;
    }

    // check if its empty
    public static function isEmpty( $param = null ){

        if (is_null($param) || empty($param) || $param == ''){
            return true;
        }else{
            return false;
        }

    }


}
