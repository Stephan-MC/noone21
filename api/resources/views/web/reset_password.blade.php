@extends('web.layouts.login')

@section('content')

	<section class="our-log-reg bgc-fa create-account home1-overlay home1_bgi1">
		<div class="container">
			<div class="row">
				<div class="col-12 text-center">
					<img class="logo1 img-fluid" src="{{url('public/web/images/logo-account.png')}}" alt="header-logo.png">
					<h3 class="text-white mb-4 mt-3">Find your Dream Home</h3>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-sm-12 col-lg-5">
					<div class="sign_up_form inner_page">
						<div class="heading">
							<h5 class="text-center">Please enter your email to rest password</h5>
						</div>
						@if (session('status'))
							<div class="alert alert-success" role="alert">
								{{ session('status') }}
							</div>
						@endif
						<div class="details">
							<form method="POST" action="{{ route('password.email') }}">
								@csrf
								<input id="email" type="email" class="form-control mb-3 @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

								@error('email')
								<span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                            </span>
								@enderror

								<button type="submit" class="btn btn-log btn-block btn-thm2">Send</button>
								<p class="text-center mb-0">Have an account? <a class="text-thm" href={{url('user/login')}}>Login</a></p>

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
