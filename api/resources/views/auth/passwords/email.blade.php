@extends('layouts.login')
@section('content')
    <div class="main-panel">
        <div class="main-content">
            <div class="content-wrapper">
                <section id="forgot-password">
                    <div class="container-fluid forgot-password-bg">
                        <div class="row full-height-vh m-0 d-flex align-items-center justify-content-center">
                            <div class="col-md-7 col-sm-12">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="card-body fg-image">
                                            <div class="row m-0">
                                                <div class="col-lg-6 d-none d-lg-block text-center py-2">
                                                    <h3> Afiye Application Dashboard </h3>
                                                    <img style="width: 250px; margin-top: 14px !important;" src="{{url('public/img/gallery/login.png')}}" alt=""
                                                         class="img-fluid mt-5" width="400" height="230">
                                                </div>
                                                <div class="col-lg-6 col-md-12 bg-white px-4 pt-3">
                                                    <div class="card-body">
                                                        @if (session('status'))
                                                            <div class="alert alert-success" role="alert">
                                                                {{ session('status') }}
                                                            </div>
                                                        @endif
                                                    <h4 class="mb-2 card-title">Recover Password</h4>
                                                    <p class="card-text mb-3">
                                                        Please enter your email address and we'll send you
                                                        instructions on how to reset your password.
                                                    </p>
                                                    <form method="POST" action="{{ route('password.email') }}">
                                                        @csrf
                                                        <input id="email" type="email" class="form-control mb-3 @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                                        @error('email')
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror

                                                    <div class="fg-actions d-flex justify-content-between">
                                                        <div class="login-btn">
                                                            <button class="btn btn-outline-primary">
                                                                <a href="{{url('login')}}" class="text-decoration-none">Back To Login</a>
                                                            </button>
                                                        </div>

                                                        <div class="recover-pass">
                                                            <button type="submit" class="btn btn-primary">
                                                                Recover
                                                            </button>
                                                        </div>
                                                    </div>
                                                    </form>
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
@endsection
