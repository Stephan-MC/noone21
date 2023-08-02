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
                                {!! Form::text('subject', $subject, array('class'=>'form-control input-lg','placeholder'=>'Search with subject')) !!}
                            </div>
                            <div class="col-md-3">
                                {!! Form::text('url', $url, array('class'=>'form-control input-lg','placeholder'=>'search with url')) !!}
                            </div>
                            <div class="col-md-2">
                                {!! Form::date('created_at', $created_at, array('class'=>'form-control input-lg','placeholder'=>'search with date')) !!}
                            </div>
                            <div class="col-md-2">
                                {!! Form::text('created_by', $created_by, array('class'=>'form-control input-lg','placeholder'=>'Search with user')) !!}
                            </div>

                            <div class="col-md-2">
                                <button type="submit" class="btn btn-info btn-success submit_btn">Filter Results</button>
                            </div>
                            {{ Form::close() }}


                        </div>
<div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header pb-2">
                                    <h4 class="card-title">All Customers & Driver List
                                    </h4>
                                </div>
                                <div class="card-content">
                                        <table class="table table-responsive-sm text-center">
                                        <thead>
                                        <tr>
                                            <th>Row</th>
                                            <th>Subject</th>
{{--                                            <th>Date & Time</th>--}}
                                            <th>URL</th>
                                            <th>Method</th>
{{--                                            <th>IP</th>--}}
{{--                                            <th>Agent</th>--}}
{{--                                            <th>Request Data</th>--}}
{{--                                            <th>Response</th>--}}
                                            <th>User</th>
{{--                                            <th>--}}
{{--                                                <div class="custom-control custom-checkbox m-0">--}}
{{--                                                    <input type="checkbox" class="custom-control-input" id="item-select-all">--}}
{{--                                                    <label class="custom-control-label" for="item-select-all"></label>--}}
{{--                                                </div>--}}
{{--                                            </th>--}}

                                        </tr>
                                        </thead>
                                        <tbody>
                                        @foreach($logs as $log)
                                        <tr>
                                            <td>{{$log->id}}</td>
                                            <td>{{Str::limit($log->subject, 20)}}</td>
{{--                                            <td>{{$log->date_time}}</td>--}}
                                            <td>{{Str::limit($log->url, 20)}}</td>
                                            <td>{{$log->method}}</td>
{{--                                            <td>{{$log->ip}}</td>--}}
{{--                                            <td>{{$log->agent}}</td>--}}
{{--                                            <td>{{$log->request_data}}</td>--}}
{{--                                            <td>{{$log->response_data}}</td>--}}
                                            <td>{{$log->created_by . '-' .$log->user->first_name. ' ' . $log->user->last_name }}</td>
                                        </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
{{--                                    {{ $users->links() }}--}}
                                    {{ $logs->appends(request()->except('page'))->links() }}
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

    <script>
        $(".check_all").click(function(){
            $(".check_single").prop("checked",$(this).prop("checked"));
        });
    </script>
@stop
