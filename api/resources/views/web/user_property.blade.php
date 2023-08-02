@extends('web.layouts.home_page')

@section('content')

	<section class="our-terms bgc-f7">
		<div class="container">
			<div class="row">
				<div class="col-lg-6 offset-lg-3">
					<div class="main-title text-center mb-4 pb-2">
						<h2 class="mb-0">Manage Properties</h2>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-lg-4">
					<div class="sidebar_listing_grid1 dn-991">
						<div class="sidebar_listing_list">
							<div class="sidebar_advanced_search_widget">
								<ul class="sasw_list mb0">
									<li class="search_area">
										<div class="form-group">
											<input type="text" class="form-control" placeholder="Price From">
										</div>
									</li>
									<li class="search_area">
										<div class="form-group">
											<input type="text" class="form-control" placeholder="Price To">
										</div>
									</li>
									<li class="search_area">
										<div class="form-group">
											<input type="text" class="form-control" placeholder="Lot Size">
										</div>
									</li>
									<li class="search_area">
										<div class="form-group">
											<input type="text" class="form-control" placeholder="Property Area (sqft)">
										</div>
									</li>

									<li class="search_area">
										<div class="form-group">
											<input type="text" class="form-control" placeholder="Address">
											<label><a href="search-property.html"><span class="flaticon-magnifying-glass"></span></a></label>
										</div>
									</li>
									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick">
													<option>Type</option>
													<option>Sale</option>
													<option>Rent</option>
												</select>
											</div>
										</div>
									</li>

									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick">
													<option>Number of bed</option>
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>4</option>
													<option>5</option>
													<option>+5</option>
												</select>
											</div>
										</div>
									</li>
									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick">
													<option>Number of bath</option>
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>4</option>
													<option>5</option>
													<option>+5</option>
												</select>
											</div>
										</div>
									</li>

									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick">
													<option>Garages</option>
													<option>Yes</option>
													<option>No</option>														</select>
											</div>
										</div>
									</li>
									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick">
													<option>Kichen</option>
													<option>0</option>
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>+3</option>
												</select>
											</div>
										</div>
									</li>


									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick">
													<option>Pool</option>
													<option>Yes</option>
													<option>No</option>
												</select>
											</div>
										</div>
									</li>



									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick">
													<option>Air Conditioner</option>
													<option>0</option>
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>4</option>
													<option>5</option>
													<option>+5</option>
												</select>
											</div>
										</div>
									</li>


									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick">
													<option>Garden</option>
													<option>Yes</option>
													<option>No</option>
												</select>
											</div>
										</div>
									</li>

									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick">
													<option>Furniture</option>
													<option>Yes</option>
													<option>No</option>
												</select>
											</div>
										</div>
									</li>

									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick">
													<option>Category</option>
													<option>Single Family</option>
													<option>Multi Family</option>
													<option>Condominium</option>
													<option>Apartment</option>
													<option>Town Home</option>
												</select>
											</div>
										</div>
									</li>

									<li>
										<div class="search_option_two">
											<div class="candidate_revew_select">
												<select class="selectpicker w100 show-tick">
													<option>Verified</option>
													<option>Yes</option>
													<option>No</option>														</select>
											</div>
										</div>
									</li>

									<li>
										<div class="search_option_button">
											<button type="submit" class="btn btn-block btn-thm">Search</button>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-8">

					<div class="row">

						@foreach($properties as $property)

							<div class="col-lg-6">
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
														<li class="list-inline-item"><a href="#">{{$property->price}}</a></li>
													</ul>
												</div>
												<div class="thmb_cntnt style3">
													<ul class="icon mb0">
														<li class="list-inline-item"><a href="#"><span class="fa fa-edit"></span></a></li>
														<li class="list-inline-item"><a href="#"><span class="fa fa-trash"></span></a></li>
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


@endsection
