@extends('web.layouts.home_page')

@section('content')

	<!-- Agent Single Grid View -->
	<section class="our-agent-single bgc-f7 pb30-991 agent-list">
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-lg-10 offset-lg-1">
					<div class="breadcrumb_content style2 mt30-767 mb30-767">
						<h2 class="breadcrumb_title text-center">{{$agent->first_name . ' ' . $agent->last_name}}'s  Profile </h2>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 col-lg-10 offset-lg-1">
					<div class="row">
						<div class="col-lg-12">
							<div class="feat_property list style2 agent">
								<div class="thumb">
									@if(!is_null($agent->profile_media))
										<img class="img-whp" src="{{url('public/media').'/'.$agent->profile_media->system_name}}" alt="{{$agent->profile_media->real_name}}" >
									@else
										<img class="img-whp" src="{{url('public/media/no_media.png')}}" alt="no media selected" style="width: 200px; height: 200px; margin-bottom: 20px; border-radius: 100px;">
									@endif

								</div>
								<div class="details">
									<div class="tc_content">
										<h4 class="float-left">Christopher Pakulla <img src="{{url('public/web/images/verified.png')}}" alt="Verified"> <small>Verified</small></h4>
										<p class="float-right pt-1"> <i class="fa fa-star"></i> 3.0</p>
										<ul class="prop_details mb0">
											<button type="button" class="btn btn-secondary mr-1"><i class="fa fa-envelope"></i> Message </button>
											<button type="button" class="btn btn-primary"><i class="fa fa-phone"></i> Contact Us</button>
											<li><a href="#">Available Properties: @if(!is_null($agent->property_count['available'])) {{$agent->property_count['available']}} @else 0 @endif</a></li>
											<li><a href="#">Sold: @if(!is_null($agent->property_count['sale'])) {{$agent->property_count['available']}} @else 0 @endif</a></li>
											<li><a href="#">Rented: @if(!is_null($agent->property_count['rent'])) {{$agent->property_count['available']}} @else 0 @endif</a></li>
										</ul>
									</div>
									<div class="fp_footer">
										<div class="fp_pdatetext-thm"><strong>About Us</strong></div>
										<p>{{$agent->about_me}}</p>
									</div>
								</div>
							</div>
							<div class="shop_single_tab_content style2 mt30">
								<ul class="nav nav-tabs" id="myTab" role="tablist">
									<li class="nav-item">
										<a class="nav-link active" id="listing-tab" data-toggle="tab" href="#listing" role="tab" aria-controls="listing" aria-selected="false">Listing</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">Reviews</a>
									</li>
								</ul>

								<div class="tab-content" id="myTabContent2">
									<div class="tab-pane fade show active row pl15 pl0-1199 pr15 pr0-1199" id="listing" role="tabpanel" aria-labelledby="listing-tab">

										<div class="col-lg-12">

											@foreach($properties as $property)

												<div class="feat_property list style2 hvr-bxshd bdrrn mb10 mt20">
												<div class="thumb">
													<img class="img-whp" src="{{url('public/web/images/property/fp1.jpg')}}" alt="fp1.jpg">
													<div class="thmb_cntnt">
														<ul class="icon mb0">
															<li class="list-inline-item"><a href="#"><span class="flaticon-heart"></span></a></li>
														</ul>
													</div>
												</div>
												<div class="details">
													<div class="tc_content">
														<div class="dtls_headr">
															<ul class="tag">
																<li class="list-inline-item"><a href="#">
																		{{$property->type_name}}
																	</a></li>
															</ul>
															<a class="fp_price" href="javascript:void(0)">
																{{$property->price}}
															</a>
														</div>
														<p class="text-thm">{{$property->category_name}}</p>
														<h4>{{$property->name}}</h4>
														<p><span class="flaticon-placeholder"></span>
															{{$property->address}}
														</p>
														<ul class="prop_details mb0">
															<li class="list-inline-item"><a href="javascript:void(0)">Beds: {{$property->no_of_bed_room}}</a></li>
															<li class="list-inline-item"><a href="javascript:void(0)">Baths: {{$property->no_of_bath_room}}</a></li>
															<li class="list-inline-item"><a href="javascript:void(0)">Sq Ft: {{$property->property_area}}</a></li>
														</ul>
														<h5 class="mt-2">About</h5>
														<p>
															{{$property->about_me}}
														</p>
													</div>
												</div>
											</div>

											@endforeach
												{{ $properties->appends(request()->except('page'))->links() }}

										</div>

									</div>

									<div class="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
										<div class="product_single_content">

											<div class="mbp_pagination_comments">

												@foreach($rating as $rat)
													<div class="mbp_first media">
														<img src="{{url('public/web/images/testimonial/1.png')}}" class="mr-3" alt="1.png">
														<div class="media-body">
															<h4 class="sub_title mt-0">Diana Cooper
																<div class="sspd_review dif">
																	<ul class="ml10">
																		<li class="list-inline-item"><a href="#"><i class="fa fa-star"></i></a></li>
																		<li class="list-inline-item"><a href="#"><i class="fa fa-star"></i></a></li>
																		<li class="list-inline-item"><a href="#"><i class="fa fa-star"></i></a></li>
																		<li class="list-inline-item"><a href="#"><i class="fa fa-star"></i></a></li>
																		<li class="list-inline-item"><a href="#"><i class="fa fa-star"></i></a></li>
																		<li class="list-inline-item"></li>
																	</ul>
																</div>
															</h4>
															<a class="sspd_postdate fz14" href="#">December 28, 2020</a>
															<p class="mt10">Beautiful home, very picturesque and close to everything in jtree! A little warm for a hot weekend, but would love to come back during the cooler seasons!</p>
														</div>
													</div>
													<div class="custom_hr"></div>
												@endforeach


												<div class="mbp_comment_form style2">
													<h4>Write a Review</h4>
													<ul class="sspd_review">
														<li class="list-inline-item">
															<ul class="mb0">
																<li class="list-inline-item"><a href="#"><i class="fa fa-star"></i></a></li>
																<li class="list-inline-item"><a href="#"><i class="fa fa-star"></i></a></li>
																<li class="list-inline-item"><a href="#"><i class="fa fa-star"></i></a></li>
																<li class="list-inline-item"><a href="#"><i class="fa fa-star"></i></a></li>
																<li class="list-inline-item"><a href="#"><i class="fa fa-star"></i></a></li>
															</ul>
														</li>
														<li class="list-inline-item review_rating_para">Your Rating & Review</li>
													</ul>
													<form class="comments_form">

														<div class="form-group">
															<textarea class="form-control" id="exampleFormControlTextarea1" rows="12" placeholder="Your Review"></textarea>
														</div>
														<button type="submit" class="btn btn-thm">Submit Review <span class="flaticon-right-arrow-1"></span></button>
													</form>
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
		</div>
	</section>

@endsection
