@extends('layouts.default')
@section('content')
    <div class="main-panel">
        <div class="main-content">
            <div class="content-wrapper">
                <section id="basic-form-layouts">
                    <div class="row">
                        <div class="col-md-12">
                            @if(\Illuminate\Support\Facades\Session::has('info'))
                                <div class="alert alert-success"> <span class="glyphicon glyphicon-ok"></span> <em> {!! session('info') !!}</em> </div>
                            @endif
                            <div class="card">
                                <div class="card-body">
                                    <div class="px-3">
                                        {!!Form::open(['url' => route('company.profile'), 'enctype' => 'multipart/form-data', 'class' => 'form form-horizontal form-bordered']) !!}

                                        <div class="form-body">
                                                <h4 class="form-section"><i class="ft-user"></i>
                                                   Update Your Company Information</h4>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Full Name:</label>
                                                            <div class="col-md-9" @if ($errors->has('full_name')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('full_name')) {{ $errors->first('full_name') }} @endif </span>
                                                                {!! Form::text('full_name', old('full_name', $company_profile->full_name), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Slogan: </label>
                                                            <div class="col-md-9" @if ($errors->has('slogan')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('slogan')) {{ $errors->first('slogan') }} @endif </span>
                                                                {!! Form::text('slogan', old('slogan', $company_profile->slogan), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Phone No: </label>
                                                            <div class="col-md-9" @if ($errors->has('phone_no')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('phone_no')) {{ $errors->first('phone_no') }} @endif </span>
                                                                {!! Form::text('phone_no', old('phone_no', $company_profile->phone_no), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Mobile No: </label>
                                                            <div class="col-md-9" @if ($errors->has('mobile_no')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('mobile_no')) {{ $errors->first('mobile_no') }} @endif </span>
                                                                {!! Form::text('mobile_no', old('mobile_no', $company_profile->mobile_no), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Address:</label>
                                                            <div class="col-md-9" @if ($errors->has('address')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('address')) {{ $errors->first('address') }} @endif </span>
                                                                {!! Form::text('address', old('address', $company_profile->address), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Country: </label>
                                                            <div class="col-md-9" @if ($errors->has('country')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('country')) {{ $errors->first('country') }} @endif </span>
                                                                {!! Form::text('country', old('country', $company_profile->country), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">City: </label>
                                                            <div class="col-md-9" @if ($errors->has('city')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('city')) {{ $errors->first('city') }} @endif </span>
                                                                {!! Form::text('city', old('city', $company_profile->city), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">State: </label>
                                                            <div class="col-md-9" @if ($errors->has('state')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('state')) {{ $errors->first('state') }} @endif </span>
                                                                {!! Form::text('state', old('state', $company_profile->state), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Zip: </label>
                                                            <div class="col-md-9" @if ($errors->has('zip')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('zip')) {{ $errors->first('zip') }} @endif </span>
                                                                {!! Form::text('zip', old('zip', $company_profile->zip), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Support Email: </label>
                                                            <div class="col-md-9" @if ($errors->has('support_email ')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('support_email')) {{ $errors->first('support_email') }} @endif </span>
                                                                {!! Form::email('support_email', old('support_email', $company_profile->support_email), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Info Email: </label>
                                                            <div class="col-md-9" @if ($errors->has('info_email ')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('info_email')) {{ $errors->first('info_email') }} @endif </span>
                                                                {!! Form::email('info_email', old('info_email', $company_profile->support_email), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Contact Email: </label>
                                                            <div class="col-md-9" @if ($errors->has('contact_email ')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('contact_email')) {{ $errors->first('contact_email') }} @endif </span>
                                                                {!! Form::email('contact_email', old('contact_email', $company_profile->support_email), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Contact Email: </label>
                                                            <div class="col-md-9" @if ($errors->has('contact_email ')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('contact_email')) {{ $errors->first('contact_email') }} @endif </span>
                                                                {!! Form::email('contact_email', old('contact_email', $company_profile->support_email), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Facebook Link Page </label>
                                                            <div class="col-md-9" @if ($errors->has('facebook_link ')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('facebook_link')) {{ $errors->first('facebook_link') }} @endif </span>
                                                                {!! Form::text('facebook_link', old('facebook_link', $company_profile->facebook_link), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Twitter link </label>
                                                            <div class="col-md-9" @if ($errors->has('twitter_link ')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('twitter_link')) {{ $errors->first('twitter_link') }} @endif </span>
                                                                {!! Form::text('twitter_link', old('twitter_link', $company_profile->twitter_link), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Google Plus </label>
                                                            <div class="col-md-9" @if ($errors->has('google_plus_link ')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('google_plus_link')) {{ $errors->first('google_plus_link') }} @endif </span>
                                                                {!! Form::text('google_plus_link', old('google_plus_link', $company_profile->google_plus_link), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control">Google Plus </label>
                                                            <div class="col-md-9" @if ($errors->has('linkedin_link ')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('linkedin_link')) {{ $errors->first('google_plus_link') }} @endif </span>
                                                                {!! Form::text('linkedin_link', old('linkedin_link', $company_profile->linkedin_link), array('class'=>'form-control')) !!}
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-md-3 label-control file" id="projectinput8" >Select Pic: </label>
                                                            <div class="col-md-3 user_edit_image">
                                                                @if(!empty($company_profile->media) && !is_null($company_profile->media))
                                                                <img style="border-radius: 100px" width="40" height="40" src="{{url('public/media').'/'.$company_profile->media->system_name}}" alt="">
                                                                @endif
                                                            </div>
                                                            <div class="col-md-6" @if ($errors->has('pic')) style="color: #ec6666; font-size: 12px; padding-top: 0px !important; padding-bottom: 12px !important;" @endif>
                                                                <span class="error_message">@if ($errors->has('pic')) {{ $errors->first('pic') }} @endif </span>
                                                                {!! Form::file('pic', array('id' => 'file' )) !!}
                                                                <span class="file-custom"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="form-actions left">
                                                <button type="submit" class="btn btn-raised btn-outline-primary mr-1">
                                                    Update Company Information
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
    </div>
@stop
