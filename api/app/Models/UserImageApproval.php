<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use App\Helpers\Helper;
use DB;
class UserImageApproval extends Model
{
    protected $fillable = [
        "real_name","system_name" ,"base_path" ,"alt_name" ,"extension","size",   
        "description", "user_id" ,"created_at","updated_at" ,
    ];
   
    public static function profileApporval($request){
     
        try {
            
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
            $images=UserImageApproval::create($media_object);
            DB::commit();
            return Helper::successResponse('Successfully Uploaded! Your Images will be pushish after reviews', $images);


        }catch (\Exception $ex) {
            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
 
}
