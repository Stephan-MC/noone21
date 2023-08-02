<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestLeads extends Model
{
    protected $table = 'request_leads';

    protected $fillable = [
        'name', 'email', 'remark', 'created_at',
         'updated_at', 'pagelink', 'ticket'
    ];

    protected $hidden = [
        'deleted_at',  'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
    ];
}
