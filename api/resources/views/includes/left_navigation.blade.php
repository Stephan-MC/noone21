<div data-active-color="white" data-background-color="black" data-image="{{url('public/img/sidebar-bg/01.jpg')}}" class="app-sidebar">
    <!-- main menu header-->
    <!-- Sidebar Header starts-->
    <div class="sidebar-header">
        <div class="logo clearfix"><a href="{{url('/admin')}}" class="logo-text float-left" style="text-transform:none !important;">
                <div class="logo-img"><img src="{{url('public/img/logo.png')}}"/></div><span class="text align-middle">Afiye</span></a><a id="sidebarToggle" href="javascript:;" class="nav-toggle d-none d-sm-none d-md-none d-lg-block"><i data-toggle="expanded" class="toggle-icon ft-toggle-right"></i></a><a id="sidebarClose" href="javascript:;" class="nav-close d-block d-md-block d-lg-none d-xl-none"><i class="ft-x"></i></a></div>
    </div>
    <!-- Sidebar Header Ends-->
    <!-- / main menu header-->
    <!-- main menu content-->
    <div class="sidebar-content">
        <div class="nav-container">
            <ul class="navigation">
                <li class=" nav-item"><a href="{{url('admin/')}}"><i class="ft-disc"></i>
                        <span class="menu-title"> Dashboard</span></a>
                </li>
                <li class=" nav-item"><a href="{{url('admin/user')}}"><i class="ft-disc"></i>
                        <span class="menu-title"> Users & Agents </span></a>
                </li>
                <li class=" nav-item"><a href="{{url('admin/property')}}"><i class="ft-disc"></i>
                        <span class="menu-title"> Properties  </span></a>
                </li>
                <li class=" nav-item"><a href="#"><i class="ft-disc"></i>
                        <span class="menu-title"> Ads Management  </span></a>
                </li>
                <li class=" nav-item"><a href="#"><i class="ft-disc"></i>
                        <span class="menu-title"> Payments </span></a>
                </li>

                <li class="has-sub nav-item"><a href="#"><i class="ft-aperture"></i><span data-i18n="" class="menu-title">Website</span></a>
                    <ul class="menu-content">
                        <li><a href="{{url('admin/company/profile')}}" class="menu-item">Company Profile</a>
                        </li>
                        <li><a href="{{url('admin/contact-us/queries')}}" class="menu-item">Contact Queries</a>
                        </li>
                    </ul>
                </li>

{{--                <li class="has-sub nav-item"><a href="#"><i class="ft-aperture"></i><span data-i18n="" class="menu-title">Developer Area</span></a>--}}
{{--                    <ul class="menu-content">--}}
{{--                        <li><a href="{{url('admin/log')}}" class="menu-item">Server Logs</a>--}}
{{--                        </li>--}}
{{--                    </ul>--}}
{{--                </li>--}}

            </ul>
        </div>
    </div>
    <div class="sidebar-background"></div>
</div>
