<?php

namespace App\Http\Controllers\Media;

use App\Helpers\Helper;
use App\Http\Requests\Media\Add;
use App\Models\Media\Media;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MediaController extends Controller{

    public function add(Add $request){
        // media object that need to add in media table
        $media_object = [
            'system_name' => Helper::random_time(). '.' .$request->file('media')->extension(),
            'real_name' => $request->file('media')->getClientOriginalName(),
            'base_path' => url('/public/media/'),
            'alt_name' => null,
            'extension' => $request->file('media')->extension(),
            'size' => $request->file('media')->getSize(),
            'description' => null,
            'created_by' => Auth::id()
        ];

        $destination_path = public_path('media');
        $request->file('media')->move($destination_path, $media_object['system_name']);
        $uploaded_media_object = Media::create($media_object);

        return helper::successresponse('Media Added successfully', $uploaded_media_object);
    }
}
