<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;
use Closure;
use App\Models\User\User;
class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next,$roles)
    {
    
     
        $roles=strtoupper($roles);
        if (!Auth::check()){
            return User::UnAuthorized();
        }
       
        if($roles=='SUPERADMIN' &&  Auth::user()->role_id==1){
            return $next($request);
        }else if
        ($roles=='ADMIN'  &&  Auth::user()->role_id==2){
            return $next($request);
        }
        else if($roles=='BUYER' &&  Auth::user()->role_id==3){
            return $next($request);
        }
        else if($roles=='VENDOR' &&  Auth::user()->role_id==4){
            return $next($request);
        }
        else if($roles=='CHANNEL' &&  Auth::user()->role_id==5){
            return $next($request);
        }
        else{
            return User::UnAuthorized();
        }
       
}
}