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
						<form method="POST" action="{{ route('user.login') }}">
							@csrf
							<div class="heading">
								<h5 class="text-center pb-1">Please Login to your account</h5>
							</div>

							<span class="error_message">@if ($errors->has('message')) {{ $errors->first('message') }} @endif </span>

							<div class="form-group">
								<span class="error_message">@if ($errors->has('email')) {{ $errors->first('email') }} @endif </span>
								<input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="Enter Your Email">
							</div>

							<div class="form-group mb-1">
								<span class="error_message">@if ($errors->has('password')) {{ $errors->first('password') }} @endif </span>
								<input id="password" type="password" class="form-control mb-0" name="password" required autocomplete="current-password" placeholder="Password">
							</div>

							<div class="form-group">
								<a class="tdu btn-fpswd float-left d-block mb-2 pb-1" href="{{url('user/reset-password')}}">Forgot Password?</a>
								<a class="tdu btn-fpswd float-right d-block mb-2 pb-1" href="{{url('user/register')}}">Create New Account</a>
							</div>
							<button type="submit" class="btn btn-log btn-block btn-thm2 mb-0">Login</button>
							<div class="divide pt-3">
								<hr>
							</div>
							<div class="row mt-4 pt-2">
								<div class="col-md-12 text-center">
									<button type="submit" class="btn color-white bgc-fb mb0 mr-3 py-2"><i class="fa fa-facebook float-left"></i></button>
									<button type="submit" class="btn btn2 color-white bgc-gogle mb0 py-2"><i class="fa fa-google float-left"></i></button>
								</div>
							</div>
						</form>
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
