@extends('web.layouts.login')

@section('content')

    <!-- Our LogIn Register -->
    <section class="our-log bgc-fa create-account style2 home1-overlay home1_bgi1">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <img class="logo1 img-fluid" src="{{url('public/web/images/logo-account.png')}}" alt="header-logo.png">
                    <h3 class="text-white mb-4 mt-3">Find your Dream Home</h3>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-sm-12 col-lg-5">
                    <div class="login_form inner_page">
                        {!!Form::open(['url' => route('user.add'), 'enctype' => 'multipart/form-data', 'class' => 'form form-horizontal form-bordered']) !!}
                        <div class="form-body">
                            <h4 class="form-section"><i class="ft-user"></i>
                                Add New User
                            </h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">User Name:</label>
                                        <div class="col-md-9" @if ($errors->has('skype_id')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('skype_id')) {{ $errors->first('skype_id') }} @endif </span>
                                            {!! Form::text('skype_id', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">First Name:</label>
                                        <div class="col-md-9" @if ($errors->has('first_name')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('first_name')) {{ $errors->first('first_name') }} @endif </span>
                                            {!! Form::text('first_name', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">Last Name:</label>
                                        <div class="col-md-9" @if ($errors->has('last_name')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('last_name')) {{ $errors->first('last_name') }} @endif </span>
                                            {!! Form::text('last_name', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">DOB </label>
                                        <div class="col-md-9" @if ($errors->has('date_of_birth')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('date_of_birth')) {{ $errors->first('date_of_birth') }} @endif </span>
                                            {!! Form::date('date_of_birth', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">Your Email: </label>
                                        <div class="col-md-9" @if ($errors->has('email')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('email')) {{ $errors->first('email') }} @endif </span>
                                            {!! Form::text('email', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">Phone No: </label>
                                        <div class="col-md-9" @if ($errors->has('phone_no')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('phone_no')) {{ $errors->first('phone_no') }} @endif </span>
                                            {!! Form::text('phone_no', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">Mobile No: </label>
                                        <div class="col-md-9" @if ($errors->has('mobile_no')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('mobile_no')) {{ $errors->first('mobile_no') }} @endif </span>
                                            {!! Form::text('mobile_no', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">Address:</label>
                                        <div class="col-md-9" @if ($errors->has('address')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('address')) {{ $errors->first('address') }} @endif </span>
                                            {!! Form::text('address', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">Country: </label>
                                        <div class="col-md-9" @if ($errors->has('country')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('country')) {{ $errors->first('country') }} @endif </span>
                                            {!! Form::text('country', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">City: </label>
                                        <div class="col-md-9" @if ($errors->has('city')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('city')) {{ $errors->first('city') }} @endif </span>
                                            {!! Form::text('city', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">State: </label>
                                        <div class="col-md-9" @if ($errors->has('state')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('state')) {{ $errors->first('state') }} @endif </span>
                                            {!! Form::text('state', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">Zip: </label>
                                        <div class="col-md-9" @if ($errors->has('zip')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('zip')) {{ $errors->first('zip') }} @endif </span>
                                            {!! Form::text('zip', null, array('class'=>'form-control')) !!}
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control">Role:  </label>
                                        <div class="col-md-9" @if ($errors->has('role_id')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                            <span class="error_message">@if ($errors->has('role_id')) {{ $errors->first('role_id') }} @endif </span>

                                            <select class="form-control input-lg" name="role_id">
                                                <option > Select </option>
                                                @foreach($roles as $role)
                                                    <option value="{{$role->id}}" {{ old('role_id') == $role->id ? 'selected' : ''}}> {{$role->name}} </option>
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
                                                    <input type="radio" id="customRadioInline1" name="gender" value= 1 @if(old('gender')  == 1) checked @endif class="custom-control-input">
                                                    <label class="custom-control-label" for="customRadioInline1">Male</label>
                                                </div>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="customRadioInline2" name="gender" value= 2 @if(old('gender')  == 2) checked @endif class="custom-control-input">
                                                    <label class="custom-control-label" for="customRadioInline2">Female</label>
                                                </div>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="customRadioInline3"  name="gender" value= 3 @if(old('gender') == 3) checked @endif class="custom-control-input">
                                                    <label class="custom-control-label" for="customRadioInline3">Other</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {{--                                                <div class="col-md-6">--}}
                                {{--                                                    <div class="form-group row">--}}
                                {{--                                                        <label class="col-md-3 label-control file" id="projectinput8" >Select Pic: </label>--}}
                                {{--                                                        <div class="col-md-6" @if ($errors->has('pic')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>--}}
                                {{--                                                            <span class="error_message">@if ($errors->has('pic')) {{ $errors->first('pic') }} @endif </span>--}}
                                {{--                                                            {!! Form::file('pic', array('id' => 'file' )) !!}--}}
                                {{--                                                            <span class="file-custom"></span>--}}
                                {{--                                                        </div>--}}
                                {{--                                                    </div>--}}
                                {{--                                                </div>--}}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    {!!Html::script(url('public/web/js/jquery-3.3.1.js')) !!}
    {!!Html::script(url('public/web/js/jquery-migrate-3.0.0.min.js')) !!}
    {!!Html::script(url('public/web/js/popper.min.js')) !!}
    {!!Html::script(url('public/web/js/bootstrap.min.js')) !!}
    {!!Html::script(url('public/web/js/jquery.mmenu.all.js')) !!}
    {!!Html::script(url('public/web/js/ace-responsive-menu.js')) !!}
    {!!Html::script(url('public/web/js/bootstrap-select.min.js')) !!}
    {!!Html::script(url('public/web/js/isotop.js')) !!}
    {!!Html::script(url('public/web/js/snackbar.min.js')) !!}
    {!!Html::script(url('public/web/js/simplebar.js')) !!}
    {!!Html::script(url('public/web/js/parallax.js')) !!}
    {!!Html::script(url('public/web/js/scrollto.js')) !!}
    {!!Html::script(url('public/web/js/jquery-scrolltofixed-min.js')) !!}
    {!!Html::script(url('public/web/js/jquery.counterup.js')) !!}
    {!!Html::script(url('public/web/js/wow.min.js')) !!}
    {!!Html::script(url('public/web/js/progressbar.js')) !!}
    {!!Html::script(url('public/web/js/slider.js')) !!}
    {!!Html::script(url('public/web/js/timepicker.js')) !!}
    {!!Html::script(url('public/web/js/script.js')) !!}
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAz77U5XQuEME6TpftaMdX0bBelQxXRlM&amp;callback=initMap"type="text/javascript"></script>
    {!!Html::script(url('public/web/js/googlemaps1.js')) !!}

@endsection