@extends('web.layouts.home_page')

@section('content')

	<!-- Listing Grid View -->
	<section class="our-listing bgc-f7 pb30-991 agent-list">
		<div class="container">

			<div class="row">
				<div class="col-lg-12">
					<div class="breadcrumb_content style2 mb0-991">
						<h2 class="breadcrumb_title text-center">All Agents</h2>
					</div>
				</div>

			</div>
			<div class="row">

				<div class="col-md-12 col-lg-12">
					<div class="row">
						@foreach($agents as $agent)
						<div class="col-md-6 col-lg-4">
							<div class="feat_property home7 agent">
								<div class="thumb">
									<img class="img-whp" src="{{url('public/web/images/team/11.jpg')}}" alt="11.jpg">
{{--									<img class="img-whp" src="{{$agent->profile_media->base_path.'/'.$agent->profile_media->system_name}}" alt="11.jpg">--}}
								</div>
								<div class="details">
									<div class="tc_content">
										<h4 class="float-left">{{$agent->first_name. ' '. $agent->last_name}} <img src="{{url('public/web/images/verified.png')}}" alt="Verified"> <small>Verified</small></h4>

										<p class="float-right pt-1"><i class="fa fa-star"></i> {{$agent->avg_rating}}</p>

										<ul class="prop_details mb0">
											<li><a href="#">Available Properties: @if(!is_null($agent->property_count['available'])) {{$agent->property_count['available']}} @else 0 @endif</a></li>
											<li><a href="#">Sold: @if(!is_null($agent->property_count['sale'])) {{$agent->property_count['available']}} @else 0 @endif</a></li>
											<li><a href="#">Rented: @if(!is_null($agent->property_count['rent'])) {{$agent->property_count['available']}} @else 0 @endif</a></li>
										</ul>
									</div>
									<div class="fp_footer">
										<ul class="fp_meta float-left mb0">
											Send Message
										</ul>
										<div class="fp_pdate float-right text-thm">
											<a href="{{url('user/agent/').'/'.$agent->id}}">View Profile <i class="fa fa-angle-right"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						@endforeach
							{{ $agents->appends(request()->except('page'))->links() }}
					</div>
				</div>
			</div>
		</div>
	</section>

@endsection
