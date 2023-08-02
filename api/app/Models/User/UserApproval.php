<?php

namespace App\Models\User;

use App\Models\Master\RejectionReason\RejectionReason;
use Illuminate\Database\Eloquent\Model;

class UserApproval extends Model{

    protected $fillable = [
        'user_id', 'rejection_reason_id', 'comments', 'created_at', 'update_at', 'created_by', 'updated_by',
    ];

    protected $hidden = [
        'updated_by', 'updated_at', 'deleted_at'
    ];

    // get user approvals relationship
    public function user(){
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    // get user created bt relationship
    public function created_by(){
        return $this->hasOne(User::class, 'id', 'created_by');
    }

    // get rejection reasons relationship
    public function rejection_reasons(){
        return $this->hasOne(RejectionReason::class, 'id', 'rejection_reason_id');
    }

    // get all user approval with filters
    public static function search($request){

        $userReview = UserApproval::with('user', 'rejection_reasons', 'created_by');

        $userId = $request->input('user_id');
        $userReview = $userReview->when($userId, function ($query, $userId) {
            return $query->where('user_id', $userId);
        });

        $rejection_reason_id = $request->input('rejection_reason_id');
        $userReview = $userReview->when($rejection_reason_id, function ($query, $rejection_reason_id) {
            return $query->where('rejection_reason_id', $rejection_reason_id);
        });

        return $userReview->orderby('id', 'desc');
    }

}
