@extends('web.layouts.home_page')

@section('content')

	<!-- Inner Page Breadcrumb -->
	<section class="inner_page_breadcrumb">
		<div class="container">
			<div class="row">
				<div class="col-xl-6">
					<div class="breadcrumb_content">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="#">Home</a></li>
							<li class="breadcrumb-item active" aria-current="page">Contact</li>
						</ol>
						<h4 class="breadcrumb_title">Contact Us</h4>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="our-contact pb0 bgc-f7">
		<div class="container">
			<div class="row">
				<div class="col-lg-7 col-xl-8">
					<div class="form_grid">

						@if(\Illuminate\Support\Facades\Session::has('info'))
							<div class="alert alert-success"> <span class="glyphicon glyphicon-ok"></span> <em> {!! session('info') !!}</em> </div>
						@endif

						<h4 class="mb5">Send Us An Email</h4>

							{!!Form::open(['url' => route('contact-us.add'), 'enctype' => 'multipart/form-data', 'class' => 'contact_form']) !!}
							<div class="row">

								<div class="col-md-6" @if ($errors->has('name')) @endif>
									<div class="form-group">
											<span class="error_message">@if ($errors->has('name')) {{ $errors->first('name') }} @endif </span>
											{!! Form::text('name', null, array('class'=>'form-control', 'placeholder' => 'Your Name')) !!}
									</div>
								</div>

								<div class="col-md-6" @if ($errors->has('email')) @endif>
									<div class="form-group">
										<span class="error_message">@if ($errors->has('email')) {{ $errors->first('email') }} @endif </span>
										{!! Form::email('email', null, array('class'=>'form-control', 'placeholder' => 'Email')) !!}
									</div>
								</div>

								<div class="col-md-6" @if ($errors->has('phone_no')) @endif>
									<div class="form-group">
										<span class="error_message">@if ($errors->has('phone_no')) {{ $errors->first('phone_no') }} @endif </span>
										{!! Form::text('phone_no', null, array('class'=>'form-control', 'placeholder' => 'Phone No')) !!}
									</div>
								</div>

								<div class="col-md-6" @if ($errors->has('subject')) @endif>
									<div class="form-group">
										<span class="error_message">@if ($errors->has('subject')) {{ $errors->first('subject') }} @endif </span>
										{!! Form::text('subject', null, array('class'=>'form-control', 'placeholder' => 'subject')) !!}
									</div>
								</div>

								<div class="col-sm-12" @if ($errors->has('body')) @endif>
									<div class="form-group">
										<span class="error_message">@if ($errors->has('body')) {{ $errors->first('body') }} @endif </span>
										{!! Form::textarea('body', null, array('class'=>'form-control', 'placeholder' => 'enter your text here', 'rows' => 8)) !!}
									</div>
									<div class="form-group mb0">
										<button type="submit" class="btn btn-lg btn-thm">
											Send Message
										</button>
									</div>
{{--									<div class="form-group mb0">--}}
{{--										<button type="button" class="btn btn-lg btn-thm">Send Message</button>--}}
{{--									</div>--}}
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="col-lg-5 col-xl-4">
					<div class="contact_localtion">
						<h4>Contact Us</h4>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						<div class="content_list">
							<h5>Address</h5>
							<p>2301 Ravenswood Rd Madison, <br>WI 53711</p>
						</div>
						<div class="content_list">
							<h5>Phone</h5>
							<p>(315) 905-2321</p>
						</div>
						<div class="content_list">
							<h5>Mail</h5>
							<p><a href="javascript:void(0)" class="__cf_email__">
									Support@AfiyeGroup.com
								</a></p>
						</div>

					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid p0 mt50">
			<div class="row">
				<div class="col-lg-12">
					<div class="h600" id="map-canvas"></div>
				</div>
			</div>
		</div>
	</section>

@endsection
