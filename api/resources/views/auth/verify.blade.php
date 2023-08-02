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
                                                    <h4 class="mb-2 card-title">Email Verify Page</h4>
                                                    <p class="card-text mb-3">
                                                        {{$message}}
                                                    </p>
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
