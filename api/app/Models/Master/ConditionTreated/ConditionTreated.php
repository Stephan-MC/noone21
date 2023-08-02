<?php

namespace App\Models\Master\ConditionTreated;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConditionTreated extends Model{

    use SoftDeletes;

    protected $table = 'condition_treated';

    protected $fillable = [
        'name', 'description', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
    ];

    protected $hidden = [
        'deleted_at'
    ];
}
