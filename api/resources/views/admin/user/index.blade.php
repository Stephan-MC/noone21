@extends('layouts.default')
@section('content')
    <div class="main-panel">
        <div class="main-content">
            <div class="content-wrapper">

                @if(Session::has('success'))
                    <div class="alert alert-primary alert-dismissible mb-2" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <strong>{{ Session::get('success') }}</strong>
                    </div>
                @endif

                        {!!Form::open([ 'class' => 'form form-horizontal form-bordered' ,'method'=> 'GET']) !!}
                        <div class="form-body row">
                            <div class="col-md-3">
                                {!! Form::text('search_keyword', $search_keyword, array('class'=>'form-control input-lg','placeholder'=>'Search keywords here')) !!}
                            </div>

                            <div class="col-md-2">
                                <select class="form-control" name="role_id">
                                    <option value="" readonly selected> Select </option>
                                    <option value= "3" @if(!empty($role_id) && $role_id == 3) selected @endif > Agent </option>
                                    <option value= "4" @if(!empty($role_id) && $role_id == 4) selected @endif> Customer </option>
                                </select>
                            </div>

                            <div class="col-md-2">
                                <select class="form-control" name="is_block">
                                    <option value="" readonly selected> Select </option>
                                    <option value= "1" @if(!empty($is_block) && $is_block == '1') selected @endif>  Blocked </option>
                                    <option value= "0" @if($is_block == '0') selected @endif> Active </option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <button type="submit" class="btn btn-info btn-success submit_btn">Filter Results</button>
                            </div>
                            {{ Form::close() }}
                            <div class="col-md-2">

                                <select class="form-control" name="bulk_action" id="action">
                                    <option value="" selected> All </option>
                                    <option value="1"> Activate </option>
                                    <option value="2"> Block </option>
                                    <option value="3"> Delete </option>
                                    <option value="4"> Approved </option>
                                    <option value="5"> Reject </option>
                                </select>

                                <span role="alert" class="invalid-feedback bulk-action-error"><strong></strong></span>
                            </div>

                            <div class="col-md-1">
                                <button type="button" class="btn btn-info btn-warning submit_btn" style="color: white;" id="apply"  data-url="{{ url('admin/user/action') }}">Apply</button>
                            </div>

                        </div>
<div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header pb-2">
                                    <h4 class="card-title">All Customers & Driver List
{{--                                        <a href="{{url('/user/add')}}">--}}
{{--                                            <button style="color: white !important; float: right !important;" type="button" class="btn btn-raised btn-outline-primary btn-min-width mr-1 mb-1">Add New Agent 0r Customer</button>--}}
{{--                                        </a>--}}
                                    </h4>
                                </div>
                                <div class="card-content">
                                        <table class="table table-responsive-sm text-center">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Skype</th>
                                            <th>Agent Request</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                            <th>
                                                <div class="custom-control custom-checkbox m-0">
                                                    <input type="checkbox" class="custom-control-input" id="item-select-all">
                                                    <label class="custom-control-label" for="item-select-all"></label>
                                                </div>
                                            </th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        @foreach($users as $user)
                                        <tr>
                                            <td>{{$user->id}}</td>
                                            <td>{{$user->first_name. ' ' . $user->last_name}}</td>
                                            <td>{{$user->email}}</td>
                                            <td>{{$user->phone_no}}</td>
                                            <td>{{$user->skype_id}}</td>

                                            <td>
                                                @if($user->agent_request == 1)
                                                    <button type="button" class="btn btn-raised btn-warning btn-min-width mr-1 mb-1">Not Sent</button>
                                                @elseif($user->agent_request == 2)
                                                    <button type="button" class="btn btn-raised btn-secondary btn-min-width mr-1 mb-1">Sent</button>
                                                @elseif($user->agent_request == 3)
                                                    <button type="button" class="btn btn-raised btn-success btn-min-width mr-1 mb-1">Approved</button>
                                                @elseif($user->agent_request == 4)
                                                    <button type="button" class="btn btn-raised btn-danger btn-min-width mr-1 mb-1">Reject</button>
                                                @endif
                                            </td>

                                            <td>
                                                {{$user->role->name}}
                                            </td>
                                            <td>
                                                @if($user->is_block == 0)
                                                    <button type="button" class="btn btn-raised btn-primary round btn-min-width mr-1 mb-1">Active</button>
                                                @elseif($user->is_block == 1)
                                                    <button type="button" class="btn btn-raised btn-danger round btn-min-width mr-1 mb-1">Blocked</button>
                                                @endif
                                            </td>

                                            <td>
{{--                                                <a href="{{url('user/edit').'/'.\Illuminate\Support\Facades\Crypt::encrypt($user->id) }}" class="warning" data-original-title="" title="">--}}
{{--                                                    Edit--}}
{{--                                                </a>--}}
                                                <a href="{{url('admin/user').'/'.\Illuminate\Support\Facades\Crypt::encrypt($user->id) }}" class="primary"  data-original-title="" title="">
                                                    View
                                                </a>
                                            </td>
                                            <td>
                                                <div class="custom-control custom-checkbox m-0">
                                                    <input type="checkbox" class="custom-control-input checkbox" id="item{{$user->id}}" value="{{$user->id}}">
                                                    <label class="custom-control-label" for="item{{$user->id}}"></label>
                                                </div>
                                            </td>
                                        </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
{{--                                    {{ $users->links() }}--}}
                                    {{ $users->appends(request()->except('page'))->links() }}
                                </div>
                            </div>
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
