<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TempMedia extends Model
{
    protected $fillable = [
        'real_name', 'system_name', 'base_path', 'alt_name', 'extension', 'size', 'description', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
    ];
}
