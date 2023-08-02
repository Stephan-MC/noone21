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

                        <div class="heading">
                            <h5 class="text-center">Please enter your information below to</h5>
                        </div>
                        <div class="details">
                            {!!Form::open(['url' => route('user.register'), 'enctype' => 'multipart/form-data']) !!}

                            <div class="form-group">
                                <span class="error_message">@if ($errors->has('first_name')) {{ $errors->first('first_name') }} @endif </span>
                                <input type="text" class="form-control" placeholder="First Name" name="first_name" value="{{old('first_name')}}" required>
                            </div>

                            <div class="form-group">
                                <span class="error_message">@if ($errors->has('last_name')) {{ $errors->first('last_name') }} @endif </span>
                                <input type="text" class="form-control" placeholder="Last Name" name="last_name" value="{{old('last_name')}}" required>
                            </div>

                            <div class="form-group">
                                <span class="error_message">@if ($errors->has('email')) {{ $errors->first('email') }} @endif </span>
                                <input type="email" class="form-control" placeholder="Email" name="email" value="{{old('email')}}" required>
                            </div>

                            <div class="form-group">
                                <span class="error_message">@if ($errors->has('phone_no')) {{ $errors->first('phone_no') }} @endif </span>
                                <input type="text" class="form-control" placeholder="Phone No" name="phone_no" value="{{old('phone_no')}}" required>
                            </div>

                            <div class="form-group d-flex align-items-center">
                                <label class="d-inline-block col-md-3 mb-0 pl-0">Gender</label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender" value="1">
                                    <label class="form-check-label" for="inlineRadio1">Male</label>
                                </div>
                                <div class="form-check form-check-inline ml-4">
                                    <input class="form-check-input" type="radio" name="gender" value="2">
                                    <label class="form-check-label" for="inlineRadio2">Female</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <span class="error_message">@if ($errors->has('password')) {{ $errors->first('password') }} @endif </span>
                                <input type="text" class="form-control" placeholder="Password" name="password" value="{{old('password')}}" required>
                            </div>

{{--                            <div class="form-group">--}}
{{--                                <span class="error_message">@if ($errors->has('confirm-password')) {{ $errors->first('confirm-password') }} @endif </span>--}}
{{--                                <input type="text" class="form-control" placeholder="Confirm Password" name="password" value="{{old('password')}}" required>--}}
{{--                            </div>--}}

                            <button type="submit" class="btn btn-log btn-block btn-thm2">Register</button>
                            <p class="text-center mb-0">Have an account? <a class="text-thm" href="{{url('user/login')}}">Login</a></p>
                            </form>
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



{{--@extends('layouts.login')--}}
{{--@section('content')--}}
{{--    <div class="main-panel">--}}
{{--        <!-- BEGIN : Main Content-->--}}
{{--        <div class="main-content">--}}
{{--            <div class="content-wrapper">--}}

{{--                <section class="our-log-reg bgc-fa create-account home1-overlay home1_bgi1 py-5 h-100">--}}
{{--                    <div class="container">--}}
{{--                        <div class="row">--}}
{{--                            <div class="col-12 text-center">--}}
{{--                                <img class="logo1 img-fluid" src="{{url('public/web/images/logo-account.png')}}" alt="header-logo.png">--}}
{{--                                <h3 class="text-white mb-4 mt-3">Find your Dream Home</h3>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="row justify-content-center">--}}
{{--                            <div class="col-sm-12 col-lg-5">--}}
{{--                                <div class="sign_up_form inner_page">--}}
{{--                                    --}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </section>--}}

{{--            </div>--}}
{{--        </div>--}}
{{--    </div>--}}
{{--@stop--}}
