@extends('layouts.login')
@section('content')
    <div class="main-panel">
        <!-- BEGIN : Main Content-->
        <div class="main-content">
            <div class="content-wrapper">
                <section id="login">
                    <div class="container-fluid">
                        <div class="row full-height-vh m-0">
                            <div class="col-12 d-flex align-items-center justify-content-center">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="card-body login-img">
                                            <div class="row m-0">
                                                <div class="col-lg-6 d-lg-block d-none py-2 text-center align-middle">
                                                    <h3> Afiye Application </h3>
                                                    <img style="width: 250px; margin-top: 14px !important;" src="{{url('public/img/gallery/login.png')}}" alt=""
                                                         class="img-fluid mt-5" width="400" height="230">
                                                </div>
                                                <div class="col-lg-6 col-md-12 bg-white px-4 pt-3">
                                                    <h4 class="mb-2 card-title">Login</h4>
                                                    <p class="card-text mb-3">
                                                        Welcome back, please login to your account.
                                                    </p>
                                                    <form method="POST" action="{{ route('login') }}">
                                                        @csrf
                                                        <input id="email" type="email"
                                                               class="form-control mb-3 @error('email') is-invalid @enderror"
                                                               name="email" value="{{ old('email') }}" required
                                                               autocomplete="email" autofocus
                                                               placeholder="Enter Your Email">
                                                        @error('email')
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                        </span>
                                                        @enderror
                                                        <input id="password" type="password"
                                                               class="form-control mb-1 @error('password') is-invalid @enderror"
                                                               name="password" required autocomplete="current-password"
                                                               placeholder="Password">
                                                        @error('password')
                                                        <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                        </span>
                                                        @enderror
                                                        <div class="d-flex justify-content-between mt-2">
                                                            <div class="remember-me">
                                                                <div
                                                                    class="custom-control custom-checkbox custom-control-inline mb-3">
                                                                    <input class="custom-control-input" type="checkbox"
                                                                           name="remember"
                                                                           id="remember" {{ old('remember') ? 'checked' : '' }}>
                                                                    <input type="checkbox" id="customCheckboxInline1"
                                                                           name="customCheckboxInline1"
                                                                           class="custom-control-input"/>
                                                                    <label class="custom-control-label"
                                                                           for="customCheckboxInline1">
                                                                        Remember Me
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            @if (Route::has('password.request'))
                                                                <div class="forgot-password-option">
                                                                    <a href="{{ route('password.request') }}"
                                                                       class="text-decoration-none text-primary">Forgot
                                                                        Password
                                                                        ?</a>
                                                                </div>
                                                            @endif
                                                        </div>
                                                        <div class="fg-actions d-flex justify-content-between">
                                                            <div class="recover-pass">
                                                                <button type="submit" class="btn btn-primary">
                                                                    Login
                                                                    <a class="text-decoration-none text-white">Login</a>
                                                                </button>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
@stop
