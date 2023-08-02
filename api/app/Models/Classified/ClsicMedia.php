<?php

namespace App\Models\Classified;
use App\Helpers\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class ClsicMedia extends Model
{
    protected $fillable = [
        'system_name','real_name','base_path','alt_name','extension','size','description'    
        ,'user_id','classified_id' 
    ];
    public static function store($image,$id,$user_id){
        $media_object = [
            'system_name' => Helper::random_time(). '.' .$image->extension(),
            'real_name' => $image->getClientOriginalName(),
            'base_path' => url('/storage/app/public/postMedia/'),
            'alt_name' => null,
            'extension' => $image->extension(),
            'size' => $image->getSize(),
            'description' => null,
            'user_id' => $user_id,
            'classified_id' => $id,
        ];
        $destination_path = public_path('media');
        $image->storeAs('postMedia',$media_object['system_name']);
        DB::beginTransaction();
        $images=ClsicMedia::create($media_object);
        DB::commit();
    }
   
}
