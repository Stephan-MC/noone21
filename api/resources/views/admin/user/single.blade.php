@extends('layouts.default')
@section('content')
    <div class="main-panel">
        <div class="main-content">
            <div class="content-wrapper">
                <section id="about">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="card">
                                <div class="card-content">
                                    <div class="card-body">
                                        <h5>Personal Information of <b class="primary">{{$user_object->first_name. ' ' . $user_object->last_name}}</b></h5>
                                        <hr>
                                        <div class="row">
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div style="padding: 0px !important;" class="grid-hover">
                                                    <div class="row">
                                                        <div class="col-12" align="center">
                                                            <figure class="effect-layla">
                                                                @if(isset($profile_media->profile_media) && !is_null(isset($profile_media->profile_media)))
                                                                    <img style="height: auto !important; transform: none !important; transition: none !important;" src="{{url('public/media').'/'.$user_object->profile_media->system_name}}" alt="img06" />
                                                                @endif
                                                                <figcaption>
                                                                    <h2>{{$user_object->first_name}}
                                                                        <span>{{$user_object->last_name}}</span>
                                                                    </h2>
                                                                </figcaption>
                                                            </figure>
{{--                                                            <a href="{{url('/user/edit').'/'.\Illuminate\Support\Facades\Crypt::encrypt($user_object->id)}}">--}}
{{--                                                                <button style="color: white !important;" type="button" class="btn btn-raised btn-warning btn-min-width mr-1 mb-1">Edit Info</button>--}}
{{--                                                            </a>--}}
                                                            <button type="button" class="btn btn-raised btn-danger btn-min-width mr-1 mb-1">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <ul style="margin-top: 0px !important;"  class="no-list-style">
                                                    <li class="mb-2">
                                                        <span class="text-bold-500 primary"><a><i class="ft-user font-small-3"></i> User Unique ID</a></span>
                                                        <span class="d-block overflow-hidden">{{$user_object->u_uid}}</span>
                                                    </li>

                                                    <li class="mb-2">
                                                        <span class="text-bold-500 primary"><a><i class="ft-briefcase font-small-3"></i> Mobile/Phone Number</a></span>
                                                        <span class="d-block overflow-hidden">{{$user_object->phone_no}}</span>
                                                    </li>
                                                    <li class="mb-2">
                                                        <span class="text-bold-500 primary"><a><i class="ft-book font-small-3"></i> Email:</a></span>
                                                        <span class="d-block overflow-hidden">{{$user_object->email}}</span>
                                                    </li>
                                                    <li class="mb-2">
                                                        <span class="text-bold-500 primary"><a><i class="ft-book font-small-3"></i> Role:</a></span>
                                                        <span class="d-block overflow-hidden">{{$user_object->role->name}} </span>
                                                    </li>
                                                    <li class="mb-2">
                                                        <span class="text-bold-500 primary"><a><i class="ft-book font-small-3"></i>Status</a></span>
                                                        <span class="d-block overflow-hidden">
                                                            @if($user_object->is_block == 0)
                                                                <button type="button" class="btn btn-raised btn-primary round btn-min-width mr-1 mb-1">Active</button>
                                                            @elseif($user_object->is_block == 1)
                                                                <button type="button" class="btn btn-raised btn-danger round btn-min-width mr-1 mb-1">Blocked</button>
                                                            @endif
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <ul style="margin-top: 0px !important;"  class="no-list-style">
                                                    <li class="mb-2">
                                                        <span class="text-bold-500 primary"><a><i class="ft-user font-small-3"></i> Complete Name  </a></span>
                                                        <span class="d-block overflow-hidden">{{$user_object->first_name. ' '. $user_object->last_name}}</span>
                                                    </li>
                                                    <li class="mb-2">
                                                        <span class="text-bold-500 primary"><a><i class="ft-smartphone font-small-3"></i> Skype Id</a></span>
                                                        <span class="d-block overflow-hidden">{{$user_object->skype_id}}</span>
                                                    </li>
                                                    <li class="mb-2">
                                                        <span class="text-bold-500 primary"><a><i class="ft-book font-small-3"></i>Gender</a></span>
                                                        <span class="d-block overflow-hidden"> @if($user_object->gender == 1) Male @elseif($user_object->gender == 2) Female @elseif($user_object->gender == 3) Transgender @endif</span>
                                                    </li>

                                                    <li class="mb-2">
                                                        <span class="text-bold-500 primary"><a><i class="ft-book font-small-3"></i> Complete Address</a></span>
                                                        <span class="d-block overflow-hidden">{{$user_object->address. ' ,'. $user_object->city. ' ,' . $user_object->state. ' ,'. $user_object->country}}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

{{--                        <div class="col-sm-12">--}}
{{--                            <div class="card">--}}
{{--                                <div class="card-content">--}}
{{--                                    <div class="card-body">--}}
{{--                                        <h5><b class="primary">{{$user_object->first_name. ' ' . $user_object->last_name}}</b>  Statistics with Application</h5>--}}
{{--                                        <hr>--}}
{{--                                        <section id="minimal-statistics-bg">--}}
{{--                                            <div class="row" matchHeight="card">--}}
{{--                                                <div class="col-xl-3 col-lg-6 col-12">--}}
{{--                                                    <div class="card bg-warning">--}}
{{--                                                        <div class="card-content">--}}
{{--                                                            <div class="px-3 py-3">--}}
{{--                                                                <div class="media">--}}
{{--                                                                    <div class="media-body white text-left">--}}
{{--                                                                        <h3>278</h3>--}}
{{--                                                                        <span>Total Picks</span>--}}
{{--                                                                    </div>--}}
{{--                                                                    <div class="media-right align-self-center">--}}
{{--                                                                        <i class="icon-rocket white font-large-2 float-right"></i>--}}
{{--                                                                    </div>--}}
{{--                                                                </div>--}}
{{--                                                            </div>--}}
{{--                                                        </div>--}}
{{--                                                    </div>--}}
{{--                                                </div>--}}
{{--                                                <div class="col-xl-3 col-lg-6 col-12">--}}
{{--                                                    <div class="card bg-success">--}}
{{--                                                        <div class="card-content">--}}
{{--                                                            <div class="px-3 py-3">--}}
{{--                                                                <div class="media">--}}
{{--                                                                    <div class="media-body white text-left">--}}
{{--                                                                        <h3>156</h3>--}}
{{--                                                                        <span>Past Picks</span>--}}
{{--                                                                    </div>--}}
{{--                                                                    <div class="media-right align-self-center">--}}
{{--                                                                        <i class="icon-rocket white font-large-2 float-right"></i>--}}
{{--                                                                    </div>--}}
{{--                                                                </div>--}}
{{--                                                            </div>--}}
{{--                                                        </div>--}}
{{--                                                    </div>--}}
{{--                                                </div>--}}

{{--                                                <div class="col-xl-3 col-lg-6 col-12">--}}
{{--                                                    <div class="card bg-danger">--}}
{{--                                                        <div class="card-content">--}}
{{--                                                            <div class="px-3 py-3">--}}
{{--                                                                <div class="media">--}}
{{--                                                                    <div class="media-body white text-left">--}}
{{--                                                                        <h3>123</h3>--}}
{{--                                                                        <span>Current Picks</span>--}}
{{--                                                                    </div>--}}
{{--                                                                    <div class="media-right align-self-center">--}}
{{--                                                                        <i class="icon-rocket white font-large-2 float-right"></i>--}}
{{--                                                                    </div>--}}
{{--                                                                </div>--}}
{{--                                                            </div>--}}
{{--                                                        </div>--}}
{{--                                                    </div>--}}
{{--                                                </div>--}}
{{--                                                <div class="col-xl-3 col-lg-6 col-12">--}}
{{--                                                    <div class="card bg-primary">--}}
{{--                                                        <div class="card-content">--}}
{{--                                                            <div class="px-3 py-3">--}}
{{--                                                                <div class="media">--}}
{{--                                                                    <div class="media-body white text-left">--}}
{{--                                                                        <h3>42364</h3>--}}
{{--                                                                        <span>Total Earned Amount</span>--}}
{{--                                                                    </div>--}}
{{--                                                                    <div class="media-right align-self-center">--}}
{{--                                                                        <i class="icon-wallet white font-large-2 float-right"></i>--}}
{{--                                                                    </div>--}}
{{--                                                                </div>--}}
{{--                                                            </div>--}}
{{--                                                        </div>--}}
{{--                                                    </div>--}}
{{--                                                </div>--}}
{{--                                            </div>--}}
{{--                                        </section>--}}
{{--                                    </div>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--            </div>--}}
        </div>
                </section>
    </div>
        </div>
    </div>
@stop
