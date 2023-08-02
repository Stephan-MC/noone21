<?php

namespace App\Http\Controllers\Log;

use App\Models\Log\Log;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogController extends Controller{

    public function index(Request $request){

        // get filtered logs from database
        $logs =  Log::get_all_logs($request->all());

        // send data in view
        return view('admin.log.index')->with([
            'logs' => $logs,
            'subject' => $request->input('subject'),
            'url' => $request->input('url'),
            'created_at' => $request->input('created_at'),
            'created_by' => $request->input('created_by'),
        ]);
    }
}
