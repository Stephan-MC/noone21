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
							<li class="breadcrumb-item active" aria-current="page">Search</li>
						</ol>
						<h4 class="breadcrumb_title">Near by</h4>
					</div>
				</div>
			</div>
		</div>
	</section>


	<section class="our-terms bgc-f7">
		<div class="container">
			<div class="row">
				<div class="col-lg-6 offset-lg-3">
					<div class="main-title text-center mb-4 pb-2">
						<h2 class="mb-0">Properties near your area</h2>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-lg-3">
					<div class="sidebar_listing_grid1 dn-991">
						<div class="sidebar_listing_list">
							<form class="sidebar_advanced_search_widget">
								{!!Form::open(['url' => route('property.filter'), 'enctype' => 'multipart/form-data', 'method' => 'get']) !!}
								<ul class="sasw_list mb0">
									<li class="search_area">
										<div class="form-group">
											<input type="number" class="form-control" placeholder="From Price" name="from_price" value="{{$request->from_price}}" >
										</div>
									</li>
									<li class="search_area">
										<div class="form-group">
											<input type="number" class="form-control" placeholder="To Price" name="to_price" value="{{$request->to_price}}" >
										</div>
									</li>
									<li class="search_area">
										<div class="form-group">
											<input type="text" class="form-control" placeholder="Lot size" name="lot_size" value="{{$request->lot_size}}" >
										</div>
									</li>
									<li class="search_area">
										<div class="form-group">
											<input type="number" class="form-control" placeholder="Area" name="property_area" value="{{$request->property_area}}" >
										</div>
									</li>

									<li class="search_area">
										<div class="form-group">

											<input type="text" name="autocomplete" id="autocomplete" class="form-control" placeholder="Select Location">

											<div id="lat_area">
												<input type="hidden" name="lat" id="latitude" class="form-control">
											</div>

											<div id="long_area">
												<input type="hidden" name="lng" id="longitude" class="form-control">
											</div>

										</div>
									</li>
									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick" name="property_type_id">

													<option selected value=""> Type </option>
													<option value="1" {{ ( $request->property_type_id ) == 1 ? 'selected' : '' }}> Sale </option>
													<option value="2" {{ ( $request->property_type_id ) == 2? 'selected' : '' }}> Rent </option>

												</select>
											</div>
										</div>
									</li>

									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick" name="no_of_bed_room">
													<option selected value="">Number of bed</option>
													<option value="1" {{ ( $request->no_of_bed_room ) == 1 ? 'selected' : '' }}> 1 </option>
													<option value="2" {{ ( $request->no_of_bed_room ) == 2? 'selected' : '' }}> 2 </option>
													<option value="3" {{ ( $request->no_of_bed_room ) == 3? 'selected' : '' }}> 3 </option>
													<option value="4" {{ ( $request->no_of_bed_room ) == 4? 'selected' : '' }}> 4 </option>
													<option value="5" {{ ( $request->no_of_bed_room ) == 5? 'selected' : '' }}> 5+ </option>
												</select>
											</div>
										</div>
									</li>
									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick" name="no_of_bath_room">
													<option selected value="" > Number of bath </option>
													<option value="1" {{ ( $request->no_of_bath_room ) == 1 ? 'selected' : '' }}> 1 </option>
													<option value="2" {{ ( $request->no_of_bath_room ) == 2? 'selected' : '' }}> 2 </option>
													<option value="3" {{ ( $request->no_of_bath_room ) == 3? 'selected' : '' }}> 3 </option>
													<option value="4" {{ ( $request->no_of_bath_room ) == 4? 'selected' : '' }}> 4 </option>
													<option value="5" {{ ( $request->no_of_bath_room ) == 5? 'selected' : '' }}> 5+ </option>
												</select>
											</div>
										</div>
									</li>

									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick" name="garage">

													<option selected value="">Garages</option>
													<option value="1" {{ ( $request->garage ) == 1 ? 'selected' : '' }}> Yes </option>
													<option value="0" {{ ( $request->garage ) == 0? 'selected' : '' }}> No </option>
												</select>
											</div>
										</div>
									</li>
									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick" name="kitchen">
													<option selected value="">Kitchen</option>
													<option value="1" {{ ( $request->kitchen ) == 1 ? 'selected' : '' }}> 1 </option>
													<option value="2" {{ ( $request->kitchen ) == 2? 'selected' : '' }}> 2 </option>
													<option value="3" {{ ( $request->kitchen ) == 3? 'selected' : '' }}> 3 </option>
												</select>
											</div>
										</div>
									</li>


									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick" name="pool">
													<option selected value="">Pool</option>
													<option value="1" {{ ( $request->pool ) == 1 ? 'selected' : '' }}> Yes </option>
													<option value="0" {{ ( $request->pool ) == 0? 'selected' : '' }}> No </option>
												</select>
											</div>
										</div>
									</li>



									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick" name="air_conditioner">
													<option selected value="">Air Conditioner</option>
													<option value="1" {{ ( $request->air_conditioner ) == 1 ? 'selected' : '' }}> 1 </option>
													<option value="2" {{ ( $request->air_conditioner ) == 2? 'selected' : '' }}> 2 </option>
													<option value="3" {{ ( $request->air_conditioner ) == 3? 'selected' : '' }}> 3 </option>
													<option value="4" {{ ( $request->air_conditioner) == 4? 'selected' : '' }}> 4 </option>
													<option value="5" {{ ( $request->air_conditioner ) == 5? 'selected' : '' }}> 5+ </option>
												</select>
											</div>
										</div>
									</li>


									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick" name="garden">
													<option selected value="">Garden</option>
													<option value="1" {{ ( $request->garden ) == 1 ? 'selected' : '' }}> Yes </option>
													<option value="0" {{ ( $request->garden ) == 0? 'selected' : '' }}> No </option>
												</select>
											</div>
										</div>
									</li>

									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick" name="furniture">
													<option selected value="">Furniture</option>
													<option value="1" {{ ( $request->furniture ) == 1 ? 'selected' : '' }}> Yes </option>
													<option value="0" {{ ( $request->furniture ) == 0? 'selected' : '' }}> No </option>
												</select>
											</div>
										</div>
									</li>

									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick" name="property_category_id">
													<option selected value="">Category</option>
													<option value="1" {{ ( $request->property_category_id ) == 1 ? 'selected' : '' }} > Single Family</option>
													<option value="2" {{ ( $request->property_category_id ) == 2 ? 'selected' : '' }} >Multi Family</option>
													<option value="3" {{ ( $request->property_category_id ) == 3 ? 'selected' : '' }} >Condominium</option>
													<option value="4" {{ ( $request->property_category_id ) == 4 ? 'selected' : '' }} >Apartment</option>
													<option value="5" {{ ( $request->property_category_id ) == 5 ? 'selected' : '' }} >Town Home</option>
													<option value="6" {{ ( $request->property_category_id) == 6 ? 'selected' : '' }} >Land</option>
												</select>
											</div>
										</div>
									</li>

{{--									<li>--}}
{{--										<div class="search_option_two">--}}
{{--											<div class="candidate_revew_select">--}}
{{--												<select class="selectpicker w100 show-tick">--}}
{{--													<option>Verified</option>--}}
{{--													<option>Yes</option>--}}
{{--													<option>No</option>														</select>--}}
{{--											</div>--}}
{{--										</div>--}}
{{--									</li>--}}

									<li>
										<div class="search_option_button">
											<button type="submit" class="btn btn-block btn-thm">Search</button>
										</div>
									</li>
								</ul>
							</form>
							</div>
						</div>
					</div>

				<div class="col-md-9">

					<div class="row">

						@foreach($properties as $property)

							<div class="col-lg-4">
								<ul class="feature_property_half_clist mb0">
									<li class="extrawide list-inline-item w-100 ml-0">
										<div class="feat_property home7 style4 mb-3 mt-3">
											<div class="thumb">
												<div class="fp_single_item_slider">
													<div class="item">
														<img class="img-whp" src="{{url('public/web/images/property/fp1.jpg')}}" alt="fp1.jpg">
													</div>
													<div class="item">
														<img class="img-whp" src="{{url('public/web/images/property/fp2.jpg')}}" alt="fp2.jpg">
													</div>
												</div>
												<div class="thmb_cntnt style2">
													<ul class="tag mb0">
														<li class="list-inline-item"><a href="#">$ {{$property->price}}</a></li>
													</ul>
												</div>
											</div>
											<div class="details">
												<div class="tc_content">
													<h4>{{$property->name}}</h4>
													<p><span class="flaticon-placeholder"></span> {{$property->address}}</p>
													<ul class="prop_details mb0">
														<li class="list-inline-item"><a href="#">Beds: {{$property->no_of_bed_room}}</a></li>
														<li class="list-inline-item"><a href="#">Baths: {{$property->no_of_bath_room}}</a></li>
														<li class="list-inline-item"><a href="#">Sq Ft: {{$property->property_area}}</a></li>
													</ul>
												</div>

											</div>
										</div>
									</li>


								</ul>
							</div>

						@endforeach


					</div>
					                                    {{ $properties->links() }}
{{--					<div class="row">--}}
{{--						<div class="col-lg-12 mt10">--}}
{{--							<div class="mbp_pagination">--}}
{{--								<ul class="page_navigation">--}}
{{--									<li class="page-item disabled">--}}
{{--										<a class="page-link" href="#" tabindex="-1" aria-disabled="true"> <span class="flaticon-left-arrow"></span> Prev</a>--}}
{{--									</li>--}}
{{--									<li class="page-item"><a class="page-link" href="#">1</a></li>--}}
{{--									<li class="page-item active" aria-current="page">--}}
{{--										<a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>--}}
{{--									</li>--}}
{{--									<li class="page-item"><a class="page-link" href="#">3</a></li>--}}
{{--									<li class="page-item"><a class="page-link" href="#">...</a></li>--}}
{{--									<li class="page-item"><a class="page-link" href="#">29</a></li>--}}
{{--									<li class="page-item">--}}
{{--										<a class="page-link" href="#"><span class="flaticon-right-arrow"></span></a>--}}
{{--									</li>--}}
{{--								</ul>--}}
{{--							</div>--}}
{{--						</div>--}}
{{--					</div>--}}
				</div>
			</div>
		</div>

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
