<?php

namespace App\Http\Controllers\Master\RequestLeads;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RequestLeads\Store;
use App\Helpers\Helper;
use App\Models\RequestLeads;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Mail;
class RequestLeadController extends Controller
{
    protected $RequestLeads = null;

    public function __construct(RequestLeads $RequestLeads){

        $this->RequestLeads = $RequestLeads;
    }
   public function addget(Request $request){
    echo "<pre>";
    print_r($request->all());
    return;
   }
   public function index(Request $request)
   {
      
    try {

        $leadRequest = RequestLeads::query();

        $search = $request->input('search'); // general search on all fields
        $sortby=$request->input('order');
        $leadRequest = $leadRequest->when($search, function ($query, $search) {
            return $query->where('name', 'like', '%' . $search   . '%')
                ->orWhere('email', 'LIKE', '%' . $search . '%')
                ->orWhere('remark', 'LIKE', '%' . $search . '%')
                ->orWhere('pagelink', 'LIKE', '%' . $search . '%')
                ->orWhere('ticket', 'LIKE', '%' . $search . '%')
                ;
        });
        return Helper::successResponse('Request Leads List', $leadRequest, $request);

    } catch (\Exception $ex) {

        return Helper::serverErrorResponse($ex->getMessage());
    }
   }

   /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
   public function create()
   {
       //
   }

   /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
   public function store(Request $request)
   {
   
       try {
           $RequestLeadsData = $request->only($this->RequestLeads->getFillable());
           $data=[];
           $ticket=strtoupper('TC-'.str::random(6));
             array_push($data, array_merge($RequestLeadsData,['ticket'=>$ticket]
                      
                     ));
           $RequestLeads = $this->RequestLeads->create($data['0']);
           $pageLink=$data['0']['pagelink'];
           $name=$data['0']['name'];
           $email=$data['0']['email'];
           $ticket=$data['0']['ticket'];
           $remarks=$data['0']['remark'];
           $response= Mail::send('emails.leadRequest',[
                                                               'pageLink'=>$pageLink,
                                                                'name'=>$name,
                                                                'email'=>$email,
                                                               'ticket'=>$ticket,
                                                               'remarks'=>$remarks
                                                        ],
                           function($message) use($data){
                                       $message->subject('Thank you for contacting us');
                                       $message->to($data['0']['email']);
                                   });
                  
           return Helper::successResponse('Property Lead has been sent', $RequestLeads);
       } catch (\Exception $ex) {

           return Helper::serverErrorResponse($ex->getMessage());
       }
   }

   /**
    * Display the specified resource.
    *
    * @param  \App\Models\RequestLeads  $requestLeads
    * @return \Illuminate\Http\Response
    */
   public function show(RequestLeads $requestLeads)
   {
       //
   }

   /**
    * Show the form for editing the specified resource.
    *
    * @param  \App\Models\RequestLeads  $requestLeads
    * @return \Illuminate\Http\Response
    */
    public function edit(Request $request){
        try {
            $updateRequestLeads = RequestLeads::where('ticket',$request->ticket)->first();
            // $updateRequestLeads->name = $request->input('name') ? $request->input('name') : $updateRequestLeads->name;
            // $updateRequestLeads->email = $request->input('email') ? $request->input('email') : $updateRequestLeads->email;
            // $updateRequestLeads->remark = $request->input('remark') ? $request->input('remark') : $updateRequestLeads->remarks;
            // $updateRequestLeads->phone_no = $request->input('phone_no') ? $request->input('phone_no') : $updateRequestLeads->phone_no;
            $updateRequestLeads->status =$request->status_code;
            $updateRequestLeads->save(); 
            return Helper::successResponse('Property lead updated successfully', $updateRequestLeads);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

   /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Models\RequestLeads  $requestLeads
    * @return \Illuminate\Http\Response
    */
   public function update(Request $request, RequestLeads $requestLeads)
   {
       //
   }

   /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Models\RequestLeads  $requestLeads
    * @return \Illuminate\Http\Response
    */
    public function delete(Delete $request){

        try {

            $this->RequestLeads->whereIn('id', $request->input('ids'))->delete();
            return Helper::successResponse('property lead deleted Successfully.');

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }
}
