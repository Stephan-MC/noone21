<?php

namespace App\models;
use DB;
use App\Helpers\Helper;
use Illuminate\Database\Eloquent\Model;

class UserVideoApproval extends Model
{
    protected $fillable = [
        'title' ,'description' ,'video_link' , 'media' ,'user_id' , 'created_at' , 'updated_at',
         'real_name','system_name', 'base_path', 'alt_name','size',
    ];
    public static function profileApporval($request){
            DB::begintransaction();
            $media_object = [
                'system_name' =>null,
                'real_name' =>null,
                'base_path' =>null ,
                'alt_name' => "video tumbnail",
                'extension' =>null ,
                'size' =>null,
                'description' => null,
                'video_link'=>$request['videoLink'],
                'user_id' => $request['user_id'],
            ];
            try {
                $media_object['system_name']='defualt.jpg';
                $media_object['base_path']=url('/storage/app/public/defualt/');
                $images=UserVideoApproval::create($media_object);
                DB::commit();
               return Helper::successResponse('Successfully Uploaded! Your Video will be publish after review', $images);

           }catch (\Exception $ex) {
               DB::rollback();
               return Helper::serverErrorResponse($ex->getMessage());
           }
       
    }
    public function CreateRecord($request){
        $media_object = [
            'system_name' =>null,
            'real_name' =>null,
            'base_path' =>null ,
            'alt_name' => "video tumbnail",
            'extension' =>null ,
            'size' =>null,
            'description' => null,
            'video_link'=>$request['videoLink'],
            'user_id' => $request['user_id'],
        ];
        $media_object['system_name']='defualt.jpg';
        $media_object['base_path']=url('/storage/app/public/defualt/');
        DB::beginTransaction();
        $images=UserVideo::create($media_object);
        DB::commit();
    }
}
