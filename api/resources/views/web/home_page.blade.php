@extends('web.layouts.home_page')

@section('content')

{{--	<div class="form-group">--}}
{{--		<label for="address_address">Address</label>--}}
{{--		<input type="text" id="address-input" name="address_address" class="form-control map-input">--}}
{{--		<input type="hidden" name="address_latitude" id="address-latitude" value="0" />--}}
{{--		<input type="hidden" name="address_longitude" id="address-longitude" value="0" />--}}
{{--	</div>--}}
{{--	<div id="address-map-container" style="width:100%;height:400px; ">--}}
{{--		<div style="width: 100%; height: 100%" id="address-map"></div>--}}
{{--	</div>--}}



	<!-- Home Design -->
	<section class="home-one home1-overlay home1_bgi1">
		<div class="container">
			<div class="row posr d-flex justify-content-center">
				<div class="col-lg-8">
					<div class="home_content">
						<div class="home-text text-center">
							<h2 class="fz48">Lets us find you a home</h2>
						</div>
						<div class="home_adv_srch_opt">
							{!!Form::open(['url' => route('property.filter'), 'enctype' => 'multipart/form-data', 'method' => 'get']) !!}
							<ul class="nav nav-pills" id="pills-tab" role="tablist">
								<li class="nav-item">
									<a type="text" class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Buy</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Rent</a>
								</li>
							</ul>
							<div class="tab-content home1_adsrchfrm" id="pills-tabContent">
								<div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

									<div class="home1-advnc-search">
										<ul class="h1ads_1st_list mb0 row">
											<li class="list-inline-item col-md-9 mr-0">
												<div class="form-group w-100">

													<input type="text" id="autocomplete" class="form-control" placeholder="Enter Location">

													<div id="lat_area">
														<input type="hidden" name="lat" id="latitude" class="form-control">
													</div>

													<div id="long_area">
														<input type="hidden" name="lng" id="longitude" class="form-control">
													</div>
												</div>
											</li>

											<li class="list-inline-item col-md-3">
												<div class="search_option_button w-100">
													<a href="#"><button type="submit" class="btn btn-thm btn-block">Search</button></a>
												</div>
											</li>
										</ul>
									</div>

								</form>
								</div>
								<div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
									<div class="home1-advnc-search">
										<ul class="h1ads_1st_list mb0 row">
											<li class="list-inline-item col-md-9 mr-0">
												<div class="form-group w-100">
													<input type="text" class="form-control" placeholder="Enter a location">
													<span class="flaticon-maps-and-flags"></span>
												</div>
											</li>

											<li class="list-inline-item col-md-3">
												<div class="search_option_button w-100">
													<a href="#"><button class="btn btn-thm btn-block">Search</button></a>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

<!-- Feature Properties -->
<section id="feature-property" class="feature-property bgc-f7">
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<a href="#feature-property">
					<div class="mouse_scroll">
						<div class="icon">
							<h4>Scroll Down</h4>
							<p>to discover more</p>
						</div>
						<div class="thumb">
							<img src={{url('public/web/images/resource/mouse.png')}} alt="mouse.png">
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
	<div class="container ovh">
		<div class="row">
			<div class="col-lg-6 offset-lg-3">
				<div class="main-title text-center mb40">
					<h2>Featured Properties</h2>
				</div>
			</div>
			<div class="col-lg-12">
				<div class="feature_property_slider">

					@foreach($properties['featured'] as $item)
						<div class="item">
							<div class="feat_property">
								<div class="thumb">
									<img class="img-whp" src={{'public/web/images/property/fp1.jpg'}} alt="fp1.jpg">
									<div class="thmb_cntnt">
										<ul class="tag mb0">
											<li class="list-inline-item"><a href="#">{{$item->price}}</a></li>
										</ul>
										<ul class="icon mb0">
											<li class="list-inline-item"><a href="#"><span class="flaticon-heart"></span></a></li>
										</ul>
									</div>
								</div>
								<div class="details">
									<div class="tc_content">
										<h4><a href="#">{{$item->name}}</a></h4>
										<p><span class="flaticon-placeholder"></span>{{$item->address}}</p>
										<ul class="prop_details mb0">
											<li class="list-inline-item"><a href="#">Beds: {{$item->no_of_bed_room}}</a></li>
											<li class="list-inline-item"><a href="#">Baths: {{$item->no_of_bath_room}}</a></li>
											<li class="list-inline-item"><a href="#">Sq Ft: {{$item->property_area}}</a></li>
										</ul>
									</div>

								</div>
							</div>
						</div>
					@endforeach
				</div>
			</div>
		</div>
	</div>

	<div class="container ovh">
		<div class="row">
			<div class="col-lg-6 offset-lg-3">
				<div class="main-title text-center mb40">
					<h2>Most Favorite Properties</h2>
				</div>
			</div>
			<div class="col-lg-12">
				<div class="feature_property_slider">

					@foreach($properties['favorite'] as $item)
						<div class="item">
							<div class="feat_property">
								<div class="thumb">
									<img class="img-whp" src={{'public/web/images/property/fp1.jpg'}} alt="fp1.jpg">
									<div class="thmb_cntnt">
										<ul class="tag mb0">
											<li class="list-inline-item"><a href="#">{{$item->price}}</a></li>
										</ul>
										<ul class="icon mb0">
											<li class="list-inline-item"><a href="#"><span class="flaticon-heart"></span></a></li>
										</ul>
									</div>
								</div>
								<div class="details">
									<div class="tc_content">
										<h4><a href="#">{{$item->name}}</a></h4>
										<p><span class="flaticon-placeholder"></span>{{$item->address}}</p>
										<ul class="prop_details mb0">
											<li class="list-inline-item"><a href="#">Beds: {{$item->no_of_bed_room}}</a></li>
											<li class="list-inline-item"><a href="#">Baths: {{$item->no_of_bath_room}}</a></li>
											<li class="list-inline-item"><a href="#">Sq Ft: {{$item->property_area}}</a></li>
										</ul>
									</div>

								</div>
							</div>
						</div>
	@endforeach
</section>


<script src="https://maps.google.com/maps/api/js?key=AIzaSyDM5gNXWjjVkrckut-qj6na2UxamRkZzZ4&libraries=places&callback=initAutocomplete" type="text/javascript"></script>

<script>
	$(document).ready(function() {
		$("#lat_area").addClass("d-none");
		$("#long_area").addClass("d-none");
	});
</script>


<script>
	google.maps.event.addDomListener(window, 'load', initialize);

	function initialize() {
		var options = {
			componentRestrictions: {country: "IN"}
		};

		var input = document.getElementById('autocomplete');
		var autocomplete = new google.maps.places.Autocomplete(input, options);
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			$('#latitude').val(place.geometry['location'].lat());
			$('#longitude').val(place.geometry['location'].lng());

			// --------- show lat and long ---------------
			$("#lat_area").removeClass("d-none");
			$("#long_area").removeClass("d-none");
		});
	}
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


@endsection
