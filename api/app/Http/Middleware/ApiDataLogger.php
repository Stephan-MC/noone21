<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ApiDataLogger{

    private $startTime;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next){
        $this->startTime = microtime(true);
        return $next($request);
    }

    public function terminate($request, $response){

        if ( env('enable_api_log', true) ) {

            $new_log = [
                'subject' => $request->path(),
                'date_time' => gmdate("F j, Y, g:i a"),
                'url' => $request->fullUrl(),
                'ip' => $request->ip(),
                'method' => $request->method(),
                'request_data' => $request->getContent(),
                'agent' => $request->header('user-agent'),
                'response_data' => $response->getContent(),
                'created_by' => Auth::id(),
            ];
            DB::table('logs')->insert($new_log);
        }
    }

}
