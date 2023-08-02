<?php

namespace App\Models\User;

use App\Models\Master\Category\Category;
use App\Models\Master\Category\SubCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class UserCategory extends Model{

    use SoftDeletes;

    protected $table = 'user_categories';

    protected $fillable = [
        'category_id', 'sub_category_id', 'user_id', 'created_at', 'update_at', 'created_by', 'updated_by',
    ];

    protected $hidden = [
        'updated_by', 'created_by', 'updated_at', 'created_at', 'deleted_at',
    ];

    // get category object
    public function category(){
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    // get sub_category array
    public function sub_categories(){
        return $this->hasMany(SubCategory::class, 'id', 'sub_category_id');
    }

    public static function getUserCategories($userId = null ){

        // get user categories
        $userCategories = DB::table('view_user_categories')->where([
            'user_id' => $userId
        ])
        ->select('category_id', 'category_name', 'user_id', 'id')
        ->groupBy('category_id')->get();

        // get sub categories of user category
        foreach ($userCategories as $category){
            $category->sub_categories = DB::table('view_user_categories')
            ->where([ 'user_id' => $userId, 'category_id' => $category->category_id ])
                ->select('sub_category_name', 'user_name', 'sub_category_id')->get();
        }

        return $userCategories;

    }
}
