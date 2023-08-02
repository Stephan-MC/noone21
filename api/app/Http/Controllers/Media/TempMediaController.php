<?php

namespace App\Http\Controllers\Media;
use App\Helpers\Helper;
use App\Http\Requests\TempMedia\Add;
use App\Models\TempMedia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TempMediaController extends Controller
{
    public function add(Add $request){
        // media object that need to add in media table
      
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $image_parts = explode(";base64,", $request->fileSource);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $destination_path = public_path('media');
        $file = $destination_path.'/'.Helper::random_time().'.png';
        file_put_contents($file, $image_base64);
       
        $media_object = [
            'system_name' => 'temp'. '.' .$request->file('media')->extension(),
            'real_name' => $request->file('media')->getClientOriginalName(),
            'base_path' => url('/public/media/'),
            'alt_name' => null,
            'extension' => $request->file('media')->extension(),
            'size' => $request->file('media')->getSize(),
            'description' => null
        ];
        $destination_path = public_path('media');
        $request->file('media')->move($destination_path, $media_object['system_name']);
        $uploaded_media_object =TempMedia::find('1');
        if(isset($uploaded_media_object)){ $uploaded_media_object->update($media_object);
            }else{  TempMedia::create($media_object);
        }
        return helper::successresponse('Media Added successfully', $uploaded_media_object);
    }
}
