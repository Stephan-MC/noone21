<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserFaq extends Model{

    use SoftDeletes;

    protected $table = 'user_faqs';

    protected $fillable = [
        'user_id', 'faq_id', 'answer', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
    ];

    protected $hidden = [
        'deleted_at'
    ];
}
