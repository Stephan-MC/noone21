@extends('layouts.default')
@section('content')
    <div class="main-panel">
        <div class="main-content">
            <div class="content-wrapper">
                <section id="basic-form-layouts">
                    <div class="row">
                        <div class="col-md-12">
                            @if(\Illuminate\Support\Facades\Session::has('info'))
                                <div class="alert alert-success"> <span class="glyphicon glyphicon-ok"></span> <em> {!! session('info') !!}</em> </div>
                            @endif
                            <div class="card">
                                <div class="card-body">
                                    <div class="px-3">
                                        {!!Form::open(['url' => route('user.edit'), 'enctype' => 'multipart/form-data', 'class' => 'form form-horizontal form-bordered']) !!}
                                        {!! Form::hidden('user_id', \Illuminate\Support\Facades\Crypt::encrypt($user_object->id)) !!}
                                        <div class="form-body">
                                                <h4 class="form-section"><i class="ft-user"></i>
                                                    Update <b>{{$user_object->first_name . ' ' . $user_object->last_name}}</b> Information</h4>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">User ID </label>
                                                            <div class="col-md-9">
                                                                {!! Form::text('id', $user_object->u_uid, array('class'=>'form-control', 'disabled' => 'disabled')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">User Name:</label>
                                                            <div class="col-md-9" @if ($errors->has('skype_id')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('skype_id')) {{ $errors->first('skype_id') }} @endif </span>
                                                                {!! Form::text('skype_id', old('skype_id', $user_object->skype_id), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">First Name:</label>
                                                            <div class="col-md-9" @if ($errors->has('first_name')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('first_name')) {{ $errors->first('first_name') }} @endif </span>
                                                                {!! Form::text('first_name', old('first_name', $user_object->first_name), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Last Name:</label>
                                                            <div class="col-md-9" @if ($errors->has('last_name')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('last_name')) {{ $errors->first('last_name') }} @endif </span>
                                                                {!! Form::text('last_name', old('last_name', $user_object->last_name), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">DOB </label>
                                                            <div class="col-md-9" @if ($errors->has('date_of_birth')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('date_of_birth')) {{ $errors->first('date_of_birth') }} @endif </span>
                                                                {!! Form::date('date_of_birth', old('date_of_birth', $user_object->date_of_birth), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Your Email: </label>
                                                            <div class="col-md-9" @if ($errors->has('email')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('email')) {{ $errors->first('email') }} @endif </span>
                                                                {!! Form::text(null, old('email', $user_object->email), array('class'=>'form-control', 'disabled' => 'disabled', 'readonly')) !!}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Phone No: </label>
                                                            <div class="col-md-9" @if ($errors->has('phone_no')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('phone_no')) {{ $errors->first('phone_no') }} @endif </span>
                                                                {!! Form::text('phone_no', old('phone_no', $user_object->phone_no), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Mobile No: </label>
                                                            <div class="col-md-9" @if ($errors->has('mobile_no')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('mobile_no')) {{ $errors->first('mobile_no') }} @endif </span>
                                                                {!! Form::text('mobile_no', old('mobile_no', $user_object->mobile_no), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Address:</label>
                                                            <div class="col-md-9" @if ($errors->has('address')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('address')) {{ $errors->first('address') }} @endif </span>
                                                                {!! Form::text('address', old('address', $user_object->address), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Country: </label>
                                                            <div class="col-md-9" @if ($errors->has('country')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('country')) {{ $errors->first('country') }} @endif </span>
                                                                {!! Form::text('country', old('country', $user_object->country), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">City: </label>
                                                            <div class="col-md-9" @if ($errors->has('city')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('city')) {{ $errors->first('city') }} @endif </span>
                                                                {!! Form::text('city', old('city', $user_object->city), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">State: </label>
                                                            <div class="col-md-9" @if ($errors->has('state')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('state')) {{ $errors->first('state') }} @endif </span>
                                                                {!! Form::text('state', old('state', $user_object->state), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Zip: </label>
                                                            <div class="col-md-9" @if ($errors->has('zip')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('zip')) {{ $errors->first('zip') }} @endif </span>
                                                                {!! Form::text('zip', old('zip', $user_object->zip), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Role:  </label>
                                                            <div class="col-md-9" @if ($errors->has('role_id')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('role_id')) {{ $errors->first('role_id') }} @endif </span>

                                                                <select class="form-control input-lg" name="role_id" disabled>
                                                                    <option disabled > Select </option>
                                                                    @foreach($roles as $role)
                                                                        <option value="{{$role->id}}" {{ old('role_id', $role->id) == $user_object->role_id ? 'selected': ''}}> {{$role->name}} </option>
                                                                    @endforeach
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Gender: </label>
                                                            <div class="col-md-9" @if ($errors->has('gender')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('gender')) {{ $errors->first('gender') }} @endif </span>
                                                                <div class="input-group">
                                                                <div class="custom-control custom-radio custom-control-inline">
                                                                    <input type="radio" id="customRadioInline1" @if($user_object->gender == 1) checked @endif name="gender" value= 1 class="custom-control-input">
                                                                    <label class="custom-control-label" for="customRadioInline1">Male</label>
                                                                </div>
                                                                <div class="custom-control custom-radio custom-control-inline">
                                                                    <input type="radio" id="customRadioInline2" @if($user_object->gender == 2) checked @endif name="gender" value= 2 class="custom-control-input">
                                                                    <label class="custom-control-label" for="customRadioInline2">Female</label>
                                                                </div>
                                                                    <div class="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" id="customRadioInline3" @if($user_object->gender == 3) checked @endif name="gender" value= 3 class="custom-control-input">
                                                                        <label class="custom-control-label" for="customRadioInline3">Other</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control file" id="projectinput8" >Select Pic: </label>
                                                            <div class="col-md-3 user_edit_image">
                                                                @if(!empty($user_object->media) && !is_null($user_object->media))
                                                                <img style="border-radius: 100px" width="40" height="40" src="{{url('public/media').'/'.$user_object->media->system_name}}" alt="">
                                                                @endif
                                                            </div>
                                                            <div class="col-md-6" @if ($errors->has('pic')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('pic')) {{ $errors->first('pic') }} @endif </span>
                                                                {!! Form::file('pic', array('id' => 'file' )) !!}
                                                                <span class="file-custom"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="form-actions left">
                                                <button type="submit" class="btn btn-raised btn-outline-primary mr-1">
                                                    Update User
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
    </div>
@stop
