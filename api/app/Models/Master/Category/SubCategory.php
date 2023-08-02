<?php

namespace App\Models\Master\Category;

use App\Helpers\Helper;
use App\Models\User\UserCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class SubCategory extends Model{

    use SoftDeletes;

    protected $table = 'sub_categories';

    protected $fillable = [
        'name', 'slug', 'description', 'media_id', 'category_id', 'created_at', 'update_at', 'created_by', 'updated_by', 'deleted_at'
    ];

    protected $hidden = [
        'updated_by', 'created_by', 'updated_at', 'created_at', 'deleted_at',
    ];


    protected $appends = array('count');

    // add appended key value
    public function getCountAttribute(){
        return UserCategory::where('sub_category_id', $this->id)->count();
    }

    // get role object of user
    public function category(){
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    // make following changes after adding the record
    protected static function boot(){
        parent::boot();
        static::created(function (SubCategory $item) {
            $item->slug = Helper::makeSlug($item->name);
            $item->created_by = Auth::id();
            $item->created_at = now();
            $item->save();
        });
    }
}
