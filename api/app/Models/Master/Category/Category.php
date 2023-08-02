<?php

namespace App\Models\Master\Category;

use App\Helpers\Helper;
use App\Models\Media\Media;
use App\Models\User\UserCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Category extends Model{

    use SoftDeletes;

    protected $table = 'categories';

    protected $fillable = [
        'name', 'is_home', 'media_id', 'description', 'media_id', 'created_at', 'update_at', 'created_by', 'updated_by', 'deleted_at'
    ];

    protected $hidden = [
        'updated_by', 'created_by', 'updated_at', 'created_at', 'deleted_at',
    ];

    protected $appends = array('count');

    // add appended key value
    public function getCountAttribute(){
        return UserCategory::where('category_id', $this->id)->count();
    }

    // get media object of category
    public function media(){
        return $this->hasOne(Media::class, 'id', 'media_id');
    }
    public function user() {
        return $this->hasMany(Users::class, 'user_id', 'id');
    }
    // make following changes after adding the record
    protected static function boot(){
        parent::boot();
        static::created(function (Category $item) {
            $item->slug =   Str::slug($item->name, '-');
            $item->created_by = Auth::id();
            $item->created_at = now();
            $item->save();
        });
    }

}
