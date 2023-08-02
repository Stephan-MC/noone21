<?php

namespace App\Models\Master\Consultation;

use App\Helpers\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Consultation extends Model{

    use SoftDeletes;

    protected $table = 'consultations';

    protected $fillable = [
        'name', 'slug', 'description', 'media_id', 'created_at', 'update_at', 'created_by', 'updated_by', 'deleted_at'
    ];

    protected $hidden = [
        'updated_by', 'created_by', 'updated_at', 'created_at', 'deleted_at',
    ];

    // make following changes after adding the record
    protected static function boot(){
        parent::boot();
        static::created(function (Consultation $item) {
            $item->slug = Helper::makeSlug($item->name);
            $item->created_by = Auth::id();
            $item->created_at = now();
            $item->save();
        });
    }
}
