<?php

namespace App\Models\User;

use App\Models\Media\Media;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserEducationApproval extends Model{


    protected $table = 'user_education_approvals';

    protected $fillable = [
        'title', 'start_date', 'end_date', 'details', 'institute', 'education_type_id', 'user_id', 'media_id', 'created_at', 'update_at', 'created_by', 'updated_by',
    ];

    protected $hidden = [
        'updated_by', 'created_by', 'updated_at', 'created_at', 'deleted_at',
    ];

    // created by relationship
    public function createdBy(){
        return $this->hasOne(User::class, 'id', 'created_by');
    }

    // updated by relationship
    public function updatedBy(){
        return $this->hasOne(User::class, 'id', 'updated_by');
    }

    // media relationship
    public function media(){
        return $this->hasOne(Media::class, 'id', 'media_id');
    }

    // user relationship
    public function user(){
        return $this->hasOne(User::class, 'id', 'user');
    }

    // get education type
    public function type(){
        return $this->hasOne(EducationType::class, 'id', 'education_type_id');
    }

    // get all user education with filters
    public static function search($request){

        $userEducations = UserEducation::query();

        $userId = $request->input('user_id');
        $userEducations = $userEducations->when($userId, function ($query, $userId) {
            return $query->where('user_id', $userId);
        });

        $educationTypeId = $request->input('education_type_id');
        $userEducations = $userEducations->when($educationTypeId, function ($query, $educationTypeId) {
            return $query->where('education_type_id', $educationTypeId);
        });

        $search = $request->input('search'); // general search on all fileds
        $userEducations = $userEducations->when($search, function ($query, $search) {
            return $query->where('institute', 'like', '%' . $search   . '%')
                ->orWhere('title', 'LIKE', '%' . $search . '%')
                ->orWhere('details', 'LIKE', '%' . $search . '%');
        });

        return $userEducations->orderby('id', 'desc');
    }
}
