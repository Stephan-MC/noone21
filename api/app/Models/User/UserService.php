<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserService extends Model{

    use SoftDeletes;

    protected $fillable = [
        'user_id', 'service_id', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
    ];

    protected $hidden = [
        'deleted_at'
    ];
}
