<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class EducationType extends Model{

    protected $fillable = [
        'name', 'slug', 'description', 'created_at', 'update_at', 'created_by', 'updated_by',
    ];

    protected $hidden = [
        'updated_by', 'created_by', 'updated_at', 'created_at', 'deleted_at',
    ];
}
