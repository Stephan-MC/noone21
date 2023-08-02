<?php

namespace App\Http\Controllers\User;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\Consultation\Add;
use App\Http\Requests\User\Consultation\Delete;
use App\Http\Requests\User\Consultation\Edit;
use App\Models\User\User;
use App\Models\User\UserConsultation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserConsultationController extends controller{

    protected $userConsultationObject = null;

    public function __construct(userconsultation $userConsultationObject){
        $this->userConsultationObject = $userConsultationObject;
    }

    // add new user consultation
    protected function add(add $request){

        try {

            $dataArr = $request->only($this->userConsultationObject->getFillable());
            $dataArr['created_by'] = Auth::id();
            $this->userConsultationObject->create($dataArr);

            $user = User::SingleUser($request->input('user_id'));

            return helper::successresponse('user consultation added successfully', $user);

        } catch (\exception $ex) {

            db::rollback();
            return helper::servererrorresponse($ex->getmessage());
        }

    }

    // get single user consultation
    public function single($id){
        try {
            $userconsultation = $this->userConsultationObject::find($id);
            if(!$userconsultation){
                return helper::notfoundresponse('we can\'t find a user consultation with that id.');
            }
            return helper::successresponse('single user consultation information.',$userconsultation);
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // edit any user consultation
    public function edit(edit $request){

        db::begintransaction();
        try {

            $userConsultation = userconsultation::find($request->input('id'));
            $userConsultation->consultation_id = $request->input('consultation_id') ? $request->input('consultation_id') : $userConsultation->consultation_id;
            $userConsultation->charges = $request->input('charges') ? $request->input('charges') : $userConsultation->charges;
            $userConsultation->user_id = $request->input('user_id') ? $request->input('user_id') : $userConsultation->user_id;
            $userConsultation->updated_by = auth::id();
            $userConsultation->updated_at = now();
            $userConsultation->save();

            db::commit();
            $user = User::SingleUser($request->input('user_id'));

            return helper::successresponse('user consultation updated successfully', $user);

        } catch (\exception $ex) {

            db::rollback();
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // delete any user consultation
    public function delete(delete $request)
    {
        $ids = $request->input('ids');
        try {
            $this->userConsultationObject->wherein('id',$ids)->delete();
            return helper::successresponse('user consultation deleted successfully');
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // get user consultation with filters
    public function index(request $request){
        try {

            $consultation = UserConsultation::search($request);
            return helper::successresponse('user consultation searched list.',$consultation, $request);

        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

}