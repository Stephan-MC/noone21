<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class UserImage extends Model
{
    

    protected $fillable = [
        "real_name","system_name" ,"base_path" ,"alt_name" ,"extension","size",   
        "description", "user_id" ,"created_at","updated_at" ,
    ];
   
    
}
