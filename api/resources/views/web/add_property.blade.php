@extends('web.layouts.home_page')

@section('content')

    <!-- Our Terms & Conditions -->
    <section class="our-terms bgc-f7">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="main-title text-center mb-4 pb-3">
                        @if(\Illuminate\Support\Facades\Session::has('info'))
                            <div class="alert alert-success"> <span class="glyphicon glyphicon-ok"></span> <em> {!! session('info') !!}</em> </div>
                        @endif

                        <h2 class="mb-0">Add Property</h2>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-12 col-xl-10">
                    <div class="my_dashboard_review">

                        {!!Form::open(['url' => route('property.add'), 'enctype' => 'multipart/form-data', 'class' => 'row']) !!}

                            <!-- <h4 class="mb30">Create Listing</h4> -->
                            <div class="col-lg-12">
                                <div class="portfolio_upload">
                                    <input type="file" name="myfile" />
                                    <div class="icon"><span class="flaticon-download"></span></div>
                                    <p>Upload property feature image</p>
                                </div>
                            </div>

                            <div class="col-xl-12">
                                <div class="resume_uploader mb30">
                                    <label class="upload">
                                        <input type="file">
                                        <i class="flaticon-download mr-2"></i>  Select image
                                    </label>
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="my_profile_setting_input form-group">
                                    <label for="propertyTitle"> Name or Title @if ($errors->has('name')) {{ $errors->first('name') }} @endif </label>
                                    <input type="text" class="form-control" placeholder="Title" name="name" value="{{old('name')}}" >
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="my_profile_setting_input form-group">
                                    <label for="propertyTitle">  Price @if ($errors->has('price')) {{ $errors->first('price') }} @endif  </label>
                                    <input type="number" class="form-control" placeholder="Price" name="price" value="{{old('price')}}" >
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="my_profile_setting_textarea">
                                    <label for="propertyDescription"> Description @if ($errors->has('description')) {{ $errors->first('description') }} @endif  </label>
                                    <textarea class="form-control" name="description" value="{{old('description')}}" placeholder="Description" rows="5"> </textarea>
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="my_profile_setting_input form-group">
                                    <label> Lot Size @if ($errors->has('lot_size')) {{ $errors->first('lot_size') }} @endif </label>
                                    <input type="number" class="form-control" placeholder="Lot Size" name="lot_size" value="{{old('lot_size')}}" >
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="my_profile_setting_input form-group">
                                    <label> Area  @if ($errors->has('area')) {{ $errors->first('area') }} @endif  </label>
                                    <input type="number" class="form-control" placeholder="lot_size" name="area" value="{{old('area')}}" >
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="my_profile_setting_input form-group">
                                    <label> Address  @if ($errors->has('address')) {{ $errors->first('address') }} @endif </label>
                                    <input type="text" class="form-control" placeholder="Address" name="address" value="{{old('address')}}" >
                                    <input type="hidden" class="form-control"  name="lat" value="{{old('lat')}}">
                                    <input type="hidden" class="form-control"  name="lng" value="{{old('lng')}}">
                                    <input type="hidden" class="form-control"  name="user_id" value="{{ \Illuminate\Support\Facades\Auth::id() }}">
                                </div>
                            </div>

                            <div class="col-lg-6 col-xl-6">
                                <div class="my_profile_setting_input ui_kit_select_search form-group">
                                    <label> Type @if ($errors->has('property_type_id')) {{ $errors->first('property_type_id') }} @endif  </label>
                                    <div class="candidate_revew_select">
                                        <select class="selectpicker w100 show-tick" name="property_type_id">

                                            <option selected> Type </option>
                                            <option value="1" {{ ( old('property_type_id')) == 1 ? 'selected' : '' }}> Sale </option>
                                            <option value="2" {{ ( old('property_type_id')) == 2? 'selected' : '' }}> Rent </option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-xl-6">
                                <div class="my_profile_setting_input ui_kit_select_search form-group">
                                    <label> Number of bed @if ($errors->has('no_of_bed')) {{ $errors->first('no_of_bed') }} @endif </label>
                                    <div class="search_option_two">
                                        <div class="candidate_revew_select">
                                            <select class="selectpicker w100 show-tick" name="no_of_bed">
                                                <option selected>Number of bed</option>
                                                <option value="1" {{ ( old('no_of_bed')) == 1 ? 'selected' : '' }}> 1 </option>
                                                <option value="2" {{ ( old('no_of_bed')) == 2? 'selected' : '' }}> 2 </option>
                                                <option value="3" {{ ( old('no_of_bed')) == 3? 'selected' : '' }}> 3 </option>
                                                <option value="4" {{ ( old('no_of_bed')) == 4? 'selected' : '' }}> 4 </option>
                                                <option value="5" {{ ( old('no_of_bed')) == 5? 'selected' : '' }}> 5+ </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-xl-6">
                                <div class="my_profile_setting_input form-group">
                                    <label for="formGroupExamplePrice">Number of bath @if ($errors->has('no_of_bath')) {{ $errors->first('no_of_bath') }} @endif </label>
                                    <div class="search_option_two">
                                        <div class="search_option_two">
                                            <div class="candidate_revew_select">
                                                <select class="selectpicker w100 show-tick" name="no_of_bath">
                                                    <option selected > Number of bath </option>
                                                    <option value="1" {{ ( old('no_of_bath')) == 1 ? 'selected' : '' }}> 1 </option>
                                                    <option value="2" {{ ( old('no_of_bath')) == 2? 'selected' : '' }}> 2 </option>
                                                    <option value="3" {{ ( old('no_of_bath')) == 3? 'selected' : '' }}> 3 </option>
                                                    <option value="4" {{ ( old('no_of_bath')) == 4? 'selected' : '' }}> 4 </option>
                                                    <option value="5" {{ ( old('no_of_bath')) == 5? 'selected' : '' }}> 5+ </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-xl-6">
                                <div class="my_profile_setting_input form-group">
                                    <label for="formGroupExamplePrice"> Garages @if ($errors->has('garage')) {{ $errors->first('garage') }} @endif </label>
                                    <div class="candidate_revew_select">
                                        <select class="selectpicker w100 show-tick" name="garage">

                                            <option selected>Garages</option>
                                            <option value="1" {{ ( old('garage')) == 1 ? 'selected' : '' }}> Yes </option>
                                            <option value="0" {{ ( old('garage')) == 0? 'selected' : '' }}> No </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-xl-6">
                                <div class="my_profile_setting_input form-group">
                                    <label for="formGroupExamplePrice"> Kitchen @if ($errors->has('kitchen')) {{ $errors->first('kitchen') }} @endif </label>
                                    <div class="candidate_revew_select">
                                        <select class="selectpicker w100 show-tick" name="kitchen">
                                            <option selected>Kitchen</option>
                                            <option value="1" {{ ( old('kitchen')) == 1 ? 'selected' : '' }}> 1 </option>
                                            <option value="2" {{ ( old('kitchen')) == 2? 'selected' : '' }}> 2 </option>
                                            <option value="3" {{ ( old('kitchen')) == 3? 'selected' : '' }}> 3 </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-xl-6">
                                <div class="my_profile_setting_input form-group">
                                    <label for="formGroupExamplePrice"> Pool @if ($errors->has('pool')) {{ $errors->first('pool') }} @endif </label>
                                    <div class="candidate_revew_select">
                                        <select class="selectpicker w100 show-tick" name="pool">
                                            <option selected>Pool</option>
                                            <option value="1" {{ ( old('pool')) == 1 ? 'selected' : '' }}> Yes </option>
                                            <option value="0" {{ ( old('pool')) == 0? 'selected' : '' }}> No </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-xl-6">
                                <div class="my_profile_setting_input form-group">
                                    <label for="formGroupExamplePrice"> Air Conditioner @if ($errors->has('air_conditioner')) {{ $errors->first('air_conditioner') }} @endif </label>
                                    <div class="candidate_revew_select">
                                        <select class="selectpicker w100 show-tick" name="air_conditioner">
                                            <option selected>Air Conditioner</option>
                                            <option value="1" {{ ( old('air_conditioner')) == 1 ? 'selected' : '' }}> 1 </option>
                                            <option value="2" {{ ( old('air_conditioner')) == 2? 'selected' : '' }}> 2 </option>
                                            <option value="3" {{ ( old('air_conditioner')) == 3? 'selected' : '' }}> 3 </option>
                                            <option value="4" {{ ( old('air_conditioner')) == 4? 'selected' : '' }}> 4 </option>
                                            <option value="5" {{ ( old('air_conditioner')) == 5? 'selected' : '' }}> 5+ </option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div class="col-lg-4 col-xl-6">
                                <div class="my_profile_setting_input form-group">
                                    <label for="formGroupExamplePrice"> Garden @if ($errors->has('garden')) {{ $errors->first('garden') }} @endif </label>
                                    <div class="candidate_revew_select">
                                        <select class="selectpicker w100 show-tick" name="garden">
                                            <option selected>Garden</option>
                                            <option value="1" {{ ( old('garden')) == 1 ? 'selected' : '' }}> Yes </option>
                                            <option value="0" {{ ( old('garden')) == 0? 'selected' : '' }}> No </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-xl-6">
                                <div class="my_profile_setting_input form-group">
                                    <label for="formGroupExamplePrice"> Furniture @if ($errors->has('furniture')) {{ $errors->first('furniture') }} @endif</label>
                                    <div class="candidate_revew_select">
                                        <select class="selectpicker w100 show-tick" name="furniture">
                                            <option selected>Furniture</option>
                                            <option value="1" {{ ( old('furniture')) == 1 ? 'selected' : '' }}> Yes </option>
                                            <option value="0" {{ ( old('furniture')) == 0? 'selected' : '' }}> No </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-xl-6">
                                <div class="my_profile_setting_input form-group">
                                    <label for="formGroupExamplePrice" >  Category @if ($errors->has('property_category_id')) {{ $errors->first('property_category_id') }} @endif </label>
                                    <div class="candidate_revew_select">
                                        <select class="selectpicker w100 show-tick" name="property_category_id">
                                            <option selected>Category</option>
                                            <option value="1" {{ ( old('property_category_id')) == 1 ? 'selected' : '' }} > Single Family</option>
                                            <option value="2" {{ ( old('property_category_id')) == 2 ? 'selected' : '' }} >Multi Family</option>
                                            <option value="3" {{ ( old('property_category_id')) == 3 ? 'selected' : '' }} >Condominium</option>
                                            <option value="4" {{ ( old('property_category_id')) == 4 ? 'selected' : '' }} >Apartment</option>
                                            <option value="5" {{ ( old('property_category_id')) == 5 ? 'selected' : '' }} >Town Home</option>
                                            <option value="6" {{ ( old('property_category_id')) == 6 ? 'selected' : '' }} >Land</option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <button type="submit" class="btn btn-log btn-block btn-thm2">Add Property</button>
                            </div>
                            </form>
                        </div>

                    </div>

                </div>

    </section>

@endsection
