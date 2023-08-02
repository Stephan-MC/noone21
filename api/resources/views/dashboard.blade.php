@extends('layouts.default')
@section('content')
    <div class="main-panel">
        <div class="main-content">
            <div class="content-wrapper">

                <div class="row">
                    <div class="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div class="card gradient-blackberry">
                            <div class="card-content">
                                <div class="card-body pt-2 pb-0">
                                    <div class="media">
                                        <div class="media-body white text-left">
                                            <h3 class="font-large-1 mb-0">0000</h3>
                                            <span>Customers</span>
                                        </div>
                                        <div class="media-right white text-right">
                                            <i class="icon-users font-large-1"></i>
                                        </div>
                                    </div>
                                </div>
                                <div id="Widget-line-chart" class="height-75 WidgetlineChart WidgetlineChartshadow mb-2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div class="card gradient-ibiza-sunset">
                            <div class="card-content">
                                <div class="card-body pt-2 pb-0">
                                    <div class="media">
                                        <div class="media-body white text-left">
                                            <h3 class="font-large-1 mb-0">0000</h3>
                                            <span>Agents</span>
                                        </div>
                                        <div class="media-right white text-right">
                                            <i class="icon-users font-large-1"></i>
                                        </div>
                                    </div>
                                </div>
                                <div id="Widget-line-chart1" class="height-75 WidgetlineChart WidgetlineChartshadow mb-2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div class="card gradient-green-tea">
                            <div class="card-content">
                                <div class="card-body pt-2 pb-0">
                                    <div class="media">
                                        <div class="media-body white text-left">
                                            <h3 class="font-large-1 mb-0">0000</h3>
                                            <span>Properties</span>
                                        </div>
                                        <div class="media-right white text-right">
                                            <i class="icon-home font-large-1"></i>
                                        </div>
                                    </div>
                                </div>
                                <div id="Widget-line-chart2" class="height-75 WidgetlineChart WidgetlineChartshadow mb-2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div class="card gradient-pomegranate">
                            <div class="card-content">
                                <div class="card-body pt-2 pb-0">
                                    <div class="media">
                                        <div class="media-body white text-left">
                                            <h3 class="font-large-1 mb-0">$0000</h3>
                                            <span>Adds</span>
                                        </div>
                                        <div class="media-right white text-right">
                                            <i class="icon-wallet font-large-1"></i>
                                        </div>
                                    </div>
                                </div>
                                <div id="Widget-line-chart3" class="height-75 WidgetlineChart WidgetlineChartshadow mb-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                    <div class="card">
                        <div class="card-header pb-2">
                            <h4 class="card-title">Recent Added Properties</h4>
                        </div>
                        <div class="card-content">
                            <table class="table table-responsive-sm text-center">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Agnet</th>
                                    <th>Customer</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><img class="media-object round-media height-50" src="{{url('/public/img').'/elements/01.png'}}" alt="Generic placeholder image" /></td>
                                    <td>Libra Ramis</td>
                                    <td>Arlne Castle</td>
                                    <td>Allama Iqbal Town, Lahore</td>
                                    <td>
                                        <a class="btn white btn-round btn-primary">New</a>
                                    </td>
                                    <td>$19.94</td>
                                    <td>
                                        <a class="danger" data-original-title="" title="">
                                            <i class="ft-x"></i>
                                        </a>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
@stop
