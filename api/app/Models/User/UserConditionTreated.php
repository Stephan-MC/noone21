<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserConditionTreated extends Model{

    use SoftDeletes;

    protected $table = 'user_condition_treated';

    protected $fillable = [
        'user_id', 'condition_treated_id', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
    ];

    protected $hidden = [
        'deleted_at'
    ];
}
