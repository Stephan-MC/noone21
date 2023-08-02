@extends('web.layouts.home_page')

@section('content')

    <section class="our-terms bgc-f7 view-profile">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="main-title text-center mb-4 pb-3">
                        <h2 class="mb-0">Edit Profile</h2>

                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-12 col-xl-10">
                    <div class="my_dashboard_review">
                        <div class="row justify-content-center">
                            <div class="col-xl-10">
                                @if(\Illuminate\Support\Facades\Session::has('info'))
                                    <div class="alert alert-success"> <span class="glyphicon glyphicon-ok"></span> <em> {!! session('info') !!}</em> </div>
                                @endif

                                    {!!Form::open(['url' => route('user.update'), 'enctype' => 'multipart/form-data', 'method' => 'post', 'class' => 'row']) !!}

                                    <div class="col-lg-6 col-xl-12">
                                        @if(!is_null($userObject->profile_media))
                                            <img src="{{$userObject->profile_media->base_path.'/'.$userObject->profile_media->system_name}}" alt="{{$userObject->profile_media->real_name}}" style="width: 200px; height: 200px; margin-bottom: 20px; border-radius: 100px;">
                                            <a href="{{$userObject->profile_media->base_path.'/'.$userObject->profile_media->system_name}}"> view full size</a>
                                        @else
                                            <img src="{{url('public/media/no_media.png')}}" alt="no media selected" style="width: 200px; height: 200px; margin-bottom: 20px; border-radius: 100px;">
                                            <a href="{{url('public/media/no_media.png')}}"> view full size</a>
                                        @endif
                                    </div>

                                    <div class="col-lg-6 col-xl-12">
                                        <div class="form-group">
                                            <label>Profile Pic</label>
                                            <label class="upload">
                                                <input type="file" name="profile_media" id="image1" accept=".gif, .jpg, .png"/>
                                            </label>
                                        </div>
                                    </div>
                                    


                                    <div class="col-lg-6 col-xl-6">
                                        <div class="my_profile_setting_input form-group">
                                            <label for="formGroupExampleInput1"> @if ($errors    ->has('first_name')) {{ $errors->first('first_name') }} @endif First Name</label>
                                            <input type="text" class="form-control" placeholder="First Name" name="first_name" value="{{old('first_name', $userObject->first_name)}}">
                                            <input type="hidden" name="id" value="{{\Illuminate\Support\Facades\Auth::id()}}">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-xl-6">
                                        <div class="my_profile_setting_input form-group">
                                            <label for="formGroupExampleInput1"> @if ($errors->has('last_name')) {{ $errors->first('last_name') }} @endif Last Name</label>
                                            <input type="text" class="form-control" placeholder="Last Name" name="last_name" value="{{old('last_name', $userObject->last_name)}}">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-xl-6">
                                        <div class="my_profile_setting_input form-group">
                                            <label for="formGroupExampleInput1"> @if ($errors->has('phone_no')) {{ $errors->first('phone_no') }} @endif Phone No</label>
                                            <input type="text" class="form-control" placeholder="Phone No" name="phone_no" value="{{old('phone_no', $userObject->phone_no)}}">
                                        </div>
                                    </div>


                                    <div class="col-lg-6 col-xl-6">
                                        <div class="my_profile_setting_input form-group">
                                            <label for="formGroupExampleInput1" > @if ($errors->has('skype_id')) {{ $errors->first('skype_id') }} @endif Skype </label>
                                            <input type="text" class="form-control" placeholder="Skype Id" name="skype_id" value="{{old('skype_id', $userObject->skype_id)}}">
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-xl-6">
                                        <div class="my_profile_setting_input form-group">
                                            <label for="formGroupExampleInput1"> @if ($errors->has('email')) {{ $errors->first('email') }} @endif Eamil</label>
                                            <input type="text" class="form-control" placeholder="Email" name="email" value="{{old('email', $userObject->email)}}">
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-xl-6">
                                        <div class="my_profile_setting_input form-group">
                                            <label for="formGroupExampleInput1"> @if ($errors->has('date_of_birth')) {{ $errors->first('date_of_birth') }} @endif Date of birth</label>
                                            <input type="date" class="form-control" placeholder="date of birth" name="date_of_birth" value="{{old('date_of_birth', $userObject->date_of_birth)}}">
                                        </div>
                                    </div>

                                    <div class="col-xl-12">
                                        <div class="my_profile_setting_input form-group">
                                            <label for="formGroupExampleInput13">Address</label>
                                            <input type="text" name="address" id="autocomplete" class="form-control" placeholder="Enter Location" value="{{old('address', $userObject->address)}}">

                                            <div id="lat_area">
                                                <input type="hidden" name="lat" id="latitude" class="form-control" value="{{old('lat', $userObject->lat)}}">
                                            </div>

                                            <div id="long_area">
                                                <input type="hidden" name="lng" id="longitude" class="form-control" value="{{old('lng', $userObject->lng)}}">
                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-xl-12">
                                        <div class="my_profile_setting_textarea">
                                            <label for="propertyDescription"> About me @if ($errors->has('about_me')) {{ $errors->first('about_me') }} @endif  </label>
                                            <textarea class="form-control" name="about_me" value="{{old('about_me', $userObject->about_us)}}" placeholder="About Us" rows="5"> </textarea>
                                        </div>
                                    </div>

                                    <div class="col-lg-12 mb-2">
                                        <div class="form-group d-flex align-items-center my-1">
                                            <label class="d-inline-block col-md-5 mb-0 pl-0">Do you want to became Agent?</label>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" {{ ( old('agent_request', $userObject->agent_request)) == 2 ? 'checked' : '' }} name="agent_request" value="2">
                                                <label class="form-check-label" for="inlineRadio1">Yes</label>
                                            </div>
                                            <div class="form-check form-check-inline ml-4">
                                                <input class="form-check-input" type="radio" {{ ( old('agent_request', $userObject->agent_request)) == 1 ? 'checked' : '' }} name="agent_request" value="1">
                                                <label class="form-check-label" for="inlineRadio2">No</label>
                                            </div>

                                        </div>
                                    </div>


                                    <div class="col-lg-12 mb-2">
                                        <div class="form-group d-flex align-items-center my-1">
                                            <label class="d-inline-block col-md-5 mb-0 pl-0">Gender</label>

                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" {{ ( old('gender', $userObject->gender)) == 1 ? 'checked' : '' }} name="gender" value="1">
                                                <label class="form-check-label" for="inlineRadio1"  >Male</label>
                                            </div>

                                            <div class="form-check form-check-inline ml-4">
                                                <input class="form-check-input" type="radio" {{ ( old('gender', $userObject->gender)) == 2 ? 'checked' : '' }} name="gender" value="2">
                                                <label class="form-check-label" for="inlineRadio2">Female</label>
                                            </div>

                                        </div>
                                    </div>


                                    <div class="col-lg-6 col-xl-12">
                                        @if(!is_null($userObject->agent_certificate_media))
                                            <img src="{{$userObject->agent_certificate_media->base_path.'/'.$userObject->agent_certificate_media->system_name}}" alt="{{$userObject->agent_certificate_media->real_name}}" style="width: 200px; height: 200px; margin-bottom: 20px; border-radius: 100px;">
                                            <a href="{{$userObject->agent_certificate_media->base_path.'/'.$userObject->agent_certificate_media->system_name}}"> view full size</a>
                                        @else
                                            <img src="{{url('public/media/no_media.png')}}" alt="no media selected" style="width: 200px; margin-bottom: 20px; height: 200px; border-radius: 100px;">
                                            <a href="{{url('public/media/no_media.png')}}"> view full size</a>
                                        @endif
                                    </div>

                                    <div class="col-lg-12 col-xl-12">
                                        <div class="form-group">
                                            <label>Driving License/ID Card Copy</label>
                                                <label class="upload">
                                                    <input type="file" name="agent_certificate_media" id="image1" accept=".pdf, .jpg, .png"/>
                                                </label>
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-xl-12">
                                        @if(!is_null($userObject->licence_media))
                                            <img src="{{$userObject->licence_media->base_path.'/'.$userObject->licence_media->system_name}}" alt="{{$userObject->licence_media->real_name}}" style="width: 200px; height: 200px; margin-bottom: 20px; border-radius: 100px;">
                                            <a href="{{$userObject->licence_media->base_path.'/'.$userObject->licence_media->system_name}}"> view full size</a>
                                        @else
                                            <img src="{{url('public/media/no_media.png')}}" alt="no media selected" style="width: 200px; height: 200px; margin-bottom: 20px; border-radius: 100px;">
                                            <a href="{{url('public/media/no_media.png')}}"> view full size</a>
                                        @endif
                                    </div>

                                    <div class="col-lg-12 col-xl-12">
                                        <div class="form-group">
                                            <label>Real State Agent Documentation</label>
                                                <label class="upload">
                                                    <input type="file" name="licence_media" id="image1" accept=".gif, .jpg, .png"/>
                                                </label>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 text-right">
                                        <div class="my_profile_setting_input">
                                            <button class="btn btn2" type="submit">Update</button>
                                        </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
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
