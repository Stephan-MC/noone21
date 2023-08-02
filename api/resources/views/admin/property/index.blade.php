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

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header pb-2">
                                    <h4 class="card-title">All Properties
                                    </h4>
                                </div>
                                <div class="card-content">
                                        <table class="table table-responsive-sm text-center">
                                        <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Area</th>
                                            <th>Type</th>
                                            <th>Category</th>
                                            <th>Beds</th>
                                            <th>Bath</th>
                                            <th>Air Conditioner</th>
                                            <th>Kitchen</th>
                                            <th>Garages</th>
                                            <th>Garden</th>
                                            <th>Pool</th>
                                            <th>Furniture</th>
                                            <th>Agent Name</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        @foreach($properties as $property)
                                        <tr>
                                            <td>{{$property->name}}</td>
                                            <td>{{$property->price}}</td>
                                            <td>{{$property->property_area}}</td>
                                            <td>{{$property->type_name}}</td>
                                            <td>{{$property->category_name}}</td>
                                            <td>{{$property->no_of_bed_room  }}</td>
                                            <td>{{$property->no_of_bath_room}}</td>
                                            <td>
                                                @if($property->air_conditioner == 1)
                                                    {{'Yes'}}
                                                @else
                                                    {{'No'}}
                                                @endif
                                            </td>
                                            <td>{{$property->kitchen}}</td>
                                            <td>
                                                @if($property->garages == 1)
                                                    {{'Yes'}}
                                                @else
                                                    {{'No'}}
                                                @endif
                                            </td>
                                            <td>
                                                @if($property->garden == 1)
                                                    {{'Yes'}}
                                                @else
                                                    {{'No'}}
                                                @endif
                                            </td>
                                            <td>
                                                @if($property->pool == 1)
                                                    {{'Yes'}}
                                                @else
                                                    {{'No'}}
                                                @endif
                                            </td>
                                            <td>
                                                @if($property->furniture == 1)
                                                    {{'Yes'}}
                                                @else
                                                    {{'No'}}
                                                @endif
                                            </td>
                                            <td>{{$property->created_by_name}}</td>

                                        </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                    {{ $properties->appends(request()->except('page'))->links() }}
                                </div>
                            </div>
                        </div>
</div>
                    </div>
            </div>

@stop
