
<!-- Main Header Nav -->
<header class="header-nav menu_style_home_one navbar-scrolltofixed stricky main-menu">
    <div class="container-fluid p0">
        <!-- Ace Responsive Menu -->
        <nav>
            <!-- Menu Toggle btn-->
            <div class="menu-toggle">
                <img class="nav_logo_img img-fluid" src={{url('public/web/images/header-logo.png')}} alt="header-logo.png">
                <button type="button" id="menu-btn">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <a href="{{url('')}}" class="navbar_brand float-left dn-smd">
                <img class="logo1 img-fluid" src={{url('public/web/images/logo.png')}} alt="header-logo.png">
                <img class="logo2 img-fluid" src={{url('public/web/images/logo.png')}} alt="header-logo2.png">
                <!-- <span>Afiye Group</span> -->
            </a>
            <!-- Responsive Menu Structure-->
            <!--Note: declare the Menu style in the data-menu-style="horizontal" (options: horizontal, vertical, accordion) -->
            <ul id="respMenu" class="ace-responsive-menu text-right" data-menu-style="horizontal">
                <li>
                    <a href="{{url('/')}}"><span class="title">Home</span></a>
                </li>
{{--                <li>--}}
{{--                    <a href="#"><span class="title">For Sale</span></a>--}}
{{--                </li>--}}
{{--                <li>--}}
{{--                    <a href="#"><span class="title">For Rent</span></a>--}}
{{--                </li>--}}

                <li>
                    <a href="{{url('user/agent')}}"><span class="title">Agents</span></a>
                </li>

                <li>
                    <a href="{{url('about-us')}}"><span class="title">About Us</span></a>
                </li>


                <li class="last">
                    <a href="{{url('contact-us')}}"><span class="title">Contact Us</span></a>
                </li>
                @guest
                    <li class="list-inline-item list_s"><a href=" {{url('user/login')}}" class="btn flaticon-user"> <span class="dn-lg">Login</span></a></li>
                @endguest

                @auth

                    <li class="user_setting notifi-list-outer">
                        <div class="dropdown menu-active">
                            <a class="btn dropdown-toggle" href="#" data-toggle="dropdown">
                                <span class="fa fa-bell"></span></a>
                            <div class="dropdown-menu">
                                <div class="user_setting_content">
                                    <div class="notifi-list">
                                        <h6>New Property Added sucessfully <span class="float-right">0 min ago</span></h6>
                                        <p class="address">Your Property Added sucessfully with details</p>
                                    </div>
                                    <div class="notifi-list">
                                        <h6>New Property Added sucessfully <span class="float-right">30 min ago</span></h6>
                                        <p class="address">Your Property Added sucessfully with details</p>
                                    </div>
                                    <div class="notifi-list">
                                        <h6>New Property Added sucessfully <span class="float-right">10 min ago</span></h6>
                                        <p class="address">Your Property Added sucessfully with details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li class="user_setting">
                        <div class="dropdown menu-active">
                            <a class="btn dropdown-toggle" href="#" data-toggle="dropdown"><img class="rounded-circle user-img" src="{{url('public/web/images/team/e1.png')}}" alt="e1.png"> <span class="dn-1199">{{\Illuminate\Support\Facades\Auth::user()->first_name . ' ' . \Illuminate\Support\Facades\Auth::user()->last_name}}</span></a>
                            <div class="dropdown-menu">
                                <div class="user_set_header">
                                    <img class="float-left" src="{{url('public/web/images/team/e1.png')}}" alt="">
                                    <p>Ali <br><span class="address">{{\Illuminate\Support\Facades\Auth::user()->email }}</span></p>
                                </div>
                                <div class="user_setting_content">
                                    <a class="dropdown-item active" href="{{url('user/update-view')}}">View Profile</a>
                                    <a class="dropdown-item" href="#">Messages</a>
                                    <a class="dropdown-item" href="#">Favorite Properties</a>
                                    <a class="dropdown-item" href="{{url('user/property')}}">Manage Properties</a>
                                    <a class="dropdown-item" href="#">My Subscriptions</a>
                                    <a class="dropdown-item" href="#">Payment</a>
                                    <a class="dropdown-item" href="{{url('user/logout')}}">Logout</a>

                                </div>
                            </div>
                        </div>
                    </li>

                    <li class="list-inline-item add_listing"><a href="{{url('user/property/add')}}"><span class="flaticon-plus"></span><span class="dn-lg"> Add Property</span></a></li>
                @endauth

            </ul>
        </nav>
    </div>
</header>
<!-- Modal -->

<!-- Main Header Nav For Mobile -->
<div id="page" class="stylehome1 h0">
    <div class="mobile-menu">
        <div class="header stylehome1">
            <div class="main_logo_home2 text-center">
                <img class="nav_logo_img img-fluid mt20" src={{url('public/web/images/logo.png')}} alt="header-logo2.png">
            </div>
            <ul class="menu_bar_home2">
                <li class="list-inline-item list_s"><a href="#"><span class="flaticon-user"></span></a></li>
                <li class="list-inline-item"><a href="#menu"><span></span></a></li>
            </ul>
        </div>
    </div>

    <!-- /.mobile-menu -->
    <nav id="menu" class="stylehome1">
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Agent List</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#"><span class="flaticon-user"></span> Login</a></li>
            <li><a href="#"><span class="flaticon-plus"></span> Add Property</a></li>
        </ul>
    </nav>
</div>