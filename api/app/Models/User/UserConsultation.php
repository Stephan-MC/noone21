<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class UserConsultation extends Model{

    use SoftDeletes;

    protected $table = 'user_consultations';

    protected $fillable = [
        'consultation_id', 'user_id', 'charges', 'created_at', 'update_at', 'created_by', 'updated_by',
    ];

    protected $hidden = [
        'updated_by', 'created_by', 'updated_at', 'created_at', 'deleted_at',
    ];

    // get all user consultation with filters
    public static function search($request){

        $userConsultation = UserConsultation::query();

        $userId = $request->input('user_id');
        $userConsultation = $userConsultation->when($userId, function ($query, $userId) {
            return $query->where('user_id', $userId);
        });

        $consultationId = $request->input('consultation_id');
        $userConsultation = $userConsultation->when($consultationId, function ($query, $consultationId) {
            return $query->where('user_consultation', $consultationId);
        });

        return $userConsultation->orderby('id', 'desc');
    }

    // get user consultations
    public static function getUserConsultation($userId = null){

        $userConsultation = DB::table('user_consultations')
            ->select('consultations.name', 'user_consultations.charges', 'consultations.id as consultation_id', 'user_consultations.id')
            ->join('consultations', 'user_consultations.consultation_id', '=', 'consultations.id')
            ->where('user_consultations.user_id', $userId)
            ->where('user_consultations.deleted_at', null)
            ->where('consultations.deleted_at', null)
            ->get();

        return $userConsultation;
    }

}
