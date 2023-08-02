<?php

namespace App\Http\Controllers\User;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\Faq\Add;
use App\Http\Requests\User\Faq\Delete;
use App\Http\Requests\User\Faq\Edit;
use App\Models\User\User;
use App\Models\User\UserFaq;
use App\Models\User\UserFaqView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserFaqController extends Controller{

    protected $userFaq = null;

    public function __construct(UserFaq $userFaq){

        $this->userFaq = $userFaq;
    }

    // get all user faq
    public function index(Request $request){

        try {

            $userFaq = UserFaqView::query();
            $search = $request->input('search'); // general search on all fields
            $userFaq = $userFaq->when($search, function ($query, $search) {
                return $query->where('question', 'like', '%' . $search   . '%')
                    ->orWhere('answer', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%');
            });
            return Helper::successResponse('User Faq list', $userFaq, $request);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // add new user faq
    public function add(Add $request){

        try {

            $dataArr = $request->only($this->userFaq->getFillable());
            $this->userFaq->create($dataArr);
            $user = User::SingleUser($request->input('user_id'));

            DB::commit();
            return Helper::successResponse('User Faq added successfully', $user);
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // get any single user faq
    public function single($id){

        try {
            $service = UserFaqView::where('id', $id);
            if(!$service){
                return Helper::notFoundResponse('We can\'t find a user Faq with that id.');
            }
            return Helper::successResponse('Single User Faq Information.', $service);
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // edit any user faq
    public function edit(Edit $request){

        try {
            $updateUserFaq = UserFaq::find($request->input('id'));
            $updateUserFaq->user_id = $request->input('user_id') ? $request->input('user_id') : $updateUserFaq->user_id;
            $updateUserFaq->faq_id = $request->input('faq_id') ? $request->input('faq_id') : $updateUserFaq->faq_id;
            $updateUserFaq->answer = $request->input('answer') ? $request->input('answer') : $updateUserFaq->answer;
            $updateUserFaq->updated_by = Auth::id();
            $updateUserFaq->save();

            $user = User::SingleUser($request->input('user_id'));

            return Helper::successResponse('User Faq updated successfully', $user);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // delete multiple user faq
    public function delete(Delete $request){

        try {

            $this->userFaq->whereIn('id', $request->input('ids'))->delete();
            return Helper::successResponse('User Faq deleted Successfully.');

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
}
