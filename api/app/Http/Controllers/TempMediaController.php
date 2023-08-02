<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Helpers\Helper;
use App\Models\TempMedia;
class TempMediaController extends Controller
{
    public function add(Add $request){
        // media object that need to add in media table
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
            }else{  $uploaded_media_object->create($media_object);
        }
        return helper::successresponse('Media Added successfully', $uploaded_media_object);
    }
}
