<?php

namespace App\Models\Master\Faq;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Faq extends Model{

    use SoftDeletes;

    protected $table = 'faqs';

    protected $fillable = [
        'question', 'answer', 'created_at', 'updated_at', 'deleted_at', 'created_by', 'updated_by'
    ];

    protected $hidden = [
        'deleted_at'
    ];

}