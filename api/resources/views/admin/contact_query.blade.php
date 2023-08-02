@extends('layouts.default')
@section('content')
    <div class="main-panel">
        <div class="main-content">
            <div class="content-wrapper">

{{--                @if(Session::has('success'))--}}
{{--                    <div class="alert alert-primary alert-dismissible mb-2" role="alert">--}}
{{--                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">--}}
{{--                            <span aria-hidden="true">×</span>--}}
{{--                        </button>--}}
{{--                        <strong>{{ Session::get('success') }}</strong>--}}
{{--                    </div>--}}
{{--                @endif--}}

{{--                {!!Form::open([ 'class' => 'form form-horizontal form-bordered' ,'method'=> 'GET']) !!}--}}
{{--                <div class="form-body row">--}}
{{--                    <div class="col-md-3">--}}
{{--                        {!! Form::text('search_keyword', $search_keyword, array('class'=>'form-control input-lg','placeholder'=>'Search keywords here')) !!}--}}
{{--                    </div>--}}

{{--                    <div class="col-md-2">--}}
{{--                        <select class="form-control" name="role_id">--}}
{{--                            <option value="" readonly selected> Select </option>--}}
{{--                            <option value= "3" @if(!empty($role_id) && $role_id == 3) selected @endif > Customer </option>--}}
{{--                            <option value= "4" @if(!empty($role_id) && $role_id == 4) selected @endif> Driver </option>--}}
{{--                        </select>--}}
{{--                    </div>--}}

{{--                    <div class="col-md-2">--}}
{{--                        <select class="form-control" name="is_block">--}}
{{--                            <option value="" readonly selected> Select </option>--}}
{{--                            <option value= "1" @if(!empty($is_block) && $is_block == '1') selected @endif>  Blocked </option>--}}
{{--                            <option value= "0" @if($is_block == '0') selected @endif> Active </option>--}}
{{--                        </select>--}}
{{--                    </div>--}}
{{--                    <div class="col-md-2">--}}
{{--                        <button type="submit" class="btn btn-info btn-success submit_btn">Filter Results</button>--}}
{{--                    </div>--}}
{{--                    {{ Form::close() }}--}}
{{--                    <div class="col-md-2">--}}

{{--                        <select class="form-control" name="bulk_action" id="action">--}}
{{--                            <option value="" selected> All </option>--}}
{{--                            <option value="1"> Activate </option>--}}
{{--                            <option value="2"> Block </option>--}}
{{--                            <option value="3"> Delete </option>--}}
{{--                            <option value="4"> Approved </option>--}}
{{--                            <option value="5"> Reject </option>--}}
{{--                        </select>--}}

{{--                        <span role="alert" class="invalid-feedback bulk-action-error"><strong></strong></span>--}}
{{--                    </div>--}}

{{--                    <div class="col-md-1">--}}
{{--                        <button type="button" class="btn btn-info btn-warning submit_btn" style="color: white;" id="apply"  data-url="{{ url('/users/action') }}">Apply</button>--}}
{{--                    </div>--}}

{{--                </div>--}}
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header pb-2">
                            <h4 class="card-title"> All Contact us Requests </h4>
                        </div>
                        <div class="card-content">
                            <table class="table table-responsive-sm text-center">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Subject</th>
                                    <th>Body</th>
{{--                                    <th>Action</th>--}}
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($contactUsForms as $contactUs)
                                    <tr>
                                        <td>{{$contactUs->created_at}}</td>
                                        <td>{{$contactUs->name}}</td>
                                        <td>{{$contactUs->email}}</td>
                                        <td>{{$contactUs->phone_no}}</td>
                                        <td>{{$contactUs->subject}}</td>
                                        <td>{{$contactUs->body}}</td>
{{--                                        <th>--}}
{{--                                            <div class="custom-control custom-checkbox m-0">--}}
{{--                                                <input type="checkbox" class="custom-control-input" id="item-select-all">--}}
{{--                                                <label class="custom-control-label" for="item-select-all"></label>--}}
{{--                                            </div>--}}
{{--                                        </th>--}}
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            $(".check_all").click(function(){
                $(".check_single").prop("checked",$(this).prop("checked"));
            });
        </script>
@stop