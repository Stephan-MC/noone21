<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UserReview extends Model{

    protected $fillable = [
        'is_approved', 'review', 'comments', 'user_id', 'review_by_id', 'created_at', 'update_at', 'created_by', 'updated_by',
    ];

    protected $hidden = [
        'password', 'remember_token', 'updated_by', 'created_by', 'updated_at', 'deleted_at', 'email_verified_at'
    ];

    // get user object of user
    public function user(){
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    // get review by user object of user
    public function review_by(){
        return $this->hasOne(User::class, 'id', 'review_by_id');
    }

    // get all user review with filters
    public static function search($request){

        $userReview = UserReview::with('user', 'review_by');

        $userId = $request->input('user_id');
        $userReview = $userReview->when($userId, function ($query, $userId) {
            return $query->where('user_id', $userId);
        });

        $isApproved = $request->input('is_approved');
        $userReview = $userReview->when($isApproved, function ($query, $isApproved) {
            return $query->where('is_approved', (int)$isApproved);
        });

        $reviewById = $request->input('review_by_id');
        $userReview = $userReview->when($reviewById, function ($query, $reviewById) {
            return $query->where('review_by_id', $reviewById);
        });

        $review = $request->input('review');
        $userReview = $userReview->when($review, function ($query, $review) {
            return $query->where('review', $review);
        });

        if (!empty($request->search)) {
            $review->whereHas('user', function ($query)use ($request) {
                return $query->where('first_name', 'like', '%' . $request->input('search')   . '%')
                    ->orWhere('last_name', 'LIKE', '%' . $request->input('search') . '%')
                    ->orWhere(DB::raw("CONCAT(first_name,' ',last_name)"), 'LIKE', '%'. $request->input('search') . '%');
            });
        }

        return $userReview->orderby('id', 'desc');
    }
}
