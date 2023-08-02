<?php

namespace App\Models\Media;

use App\Helpers\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Media extends Model
{
    protected $fillable = [
        'real_name', 'system_name', 'base_path', 'alt_name', 'extension', 'size', 'description', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
    ];

    protected $hidden = [
        'description', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
    ];

    // upload file
    public static function upload_image( $image ) {

        // media object that need to add in media table
        $media_object = [
            'system_name' => Helper::random_time(). '.' .$image->extension(),
            'real_name' => $image->getClientOriginalName(),
            'base_path' => url('/public/media/'),
            'alt_name' => null,
            'extension' => $image->extension(),
            'size' => $image->getSize(),
            'description' => null,
            'created_by' => Auth::id()
        ];

        $destination_path = public_path('media');
        $image->move($destination_path, $media_object['system_name']);
        $uploaded_media_object = Media::create($media_object);

        return $uploaded_media_object;

    }
}
