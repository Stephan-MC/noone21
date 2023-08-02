<?php

namespace App\Http\Controllers\Master\Faq;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\Faq\Add;
use App\Http\Requests\Master\Faq\Delete;
use App\Http\Requests\Master\Faq\Edit;
use App\Models\Master\Faq\Faq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FaqController extends Controller{

    protected $faq = null;

    public function __construct(Faq $faq){

        $this->faq = $faq;
    }

    // get all faq
    public function index(Request $request){

        try {

            $faq = Faq::query();
            $search = $request->input('search'); // general search on all fields
            $faq = $faq->when($search, function ($query, $search) {
                return $query->where('question', 'like', '%' . $search   . '%')
                    ->orWhere('answer', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%');
            });
            return Helper::successResponse('Faq list', $faq, $request);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // add new faq
    public function add(Add $request){

        try {

            $dataArr = $request->only($this->faq->getFillable());
            $faq = $this->faq->create($dataArr);

            DB::commit();
            return Helper::successResponse('Faq added successfully', $faq);
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // get any single faq
    public function single($id){

        try {
            $faq = $this->faq->find($id);
            if(!$faq){
                return Helper::notFoundResponse('We can\'t find a faq with that id.');
            }
            return Helper::successResponse('Single faq Information.', $faq);
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // edit any faq
    public function edit(Edit $request){

        try {
            $updateFaq = Faq::find($request->input('id'));
            $updateFaq->question = $request->input('question') ? $request->input('question') : $updateFaq->name;
            $updateFaq->answer = $request->input('answer') ? $request->input('answer') : $updateFaq->answer;
            $updateFaq->description = $request->input('description') ? $request->input('description') : $updateFaq->description;
            $updateFaq->updated_by = Auth::id();
            $updateFaq->save();

            return Helper::successResponse('Faq updated successfully', $updateFaq);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // delete multiple faq
    public function delete(Delete $request){

        try {

            $this->faq->whereIn('id', $request->input('ids'))->delete();
            return Helper::successResponse('Faq deleted Successfully.');

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
}
