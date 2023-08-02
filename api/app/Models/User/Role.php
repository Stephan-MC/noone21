<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = [
        'name', 'description', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
    ];

    protected $hidden = [
        'deleted_at'
    ];
}
