<?php

namespace App\Http\Controllers\User;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\Review\Add;
use App\Http\Requests\User\Review\Approve;
use App\Http\Requests\User\Review\Delete;
use App\Http\Requests\User\Review\Edit;
use App\Models\User\UserReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserReviewController extends Controller{

    protected $userReviewObject = null;

    public function __construct(UserReview $userReviewObject){
        $this->userReviewObject = $userReviewObject;
    }

    // add new user review
    protected function add(Add $request){

        try {

            $dataArr = $request->only($this->userReviewObject->getFillable());
            $userReviewObject = $this->userReviewObject->create($dataArr);

            $userReview = UserReview::with('user', 'review_by')->find($userReviewObject->id);

            DB::commit();
            return Helper::successResponse('User review added successfully', $userReview);
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // get single user review
    public function single($id){
        try {
            $userReview = UserReview::with('user', 'review_by')->find($id);

            if(!$userReview){
                return helper::notfoundresponse('we can\'t find a user review with that id.');
            }
            return helper::successresponse('single user review information.', $userReview);
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // edit any user review
    public function edit(Edit $request){

        DB::begintransaction();
        try {

            $updateUserReview = UserReview::find($request->input('id'));
            $updateUserReview->review = $request->input('review') ? $request->input('review') : $updateUserReview->review;
            $updateUserReview->comments = $request->input('comments') ? $request->input('comments') : $updateUserReview->comments;
            $updateUserReview->updated_by = Auth::id();
            $updateUserReview->updated_at = now();
            $updateUserReview->save();

            $userReview = UserReview::with('user', 'review_by')->find($request->input('id'));

            DB::commit();
            return helper::successresponse('user review updated successfully', $userReview);

        } catch (\exception $ex) {

            db::rollback();
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // delete any user review
    public function delete(Delete $request)
    {
        $ids = $request->input('ids');
        try {
            $this->userReviewObject->whereIn('id', $ids)->delete();
            return helper::successresponse('user review deleted successfully');
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // get user review with filters
    public function index(request $request){
        try {

            $consultation = UserReview::search($request);
            return helper::successresponse('user consultation searched list.',$consultation, $request);

        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // approve review
    public function approve(Approve $request)
    {

        try {

            DB::table('user_reviews')->whereIn('id', $request->input('ids'))->update(['is_approved' => $request->input('is_approved')]);

            return helper::successresponse('user review approved successfully');
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }
}
