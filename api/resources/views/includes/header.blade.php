<!-- Navbar (Header) Starts-->
<nav class="navbar navbar-expand-lg navbar-light bg-faded header-navbar">
    <div class="container-fluid">
        <div class="navbar-header">
{{--            <form role="search" class="navbar-form navbar-right mt-1">--}}
{{--                <div class="position-relative has-icon-right">--}}
{{--                    <input type="text" placeholder="search any pick here" class="form-control"/>--}}
{{--                    <div class="form-control-position"><i class="ft-search"></i></div>--}}
{{--                </div>--}}
{{--            </form>--}}
        </div>
        <div class="navbar-container">
            <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li class="dropdown nav-item">
                        <a id="dropdownBasic3" href="#" data-toggle="dropdown" class="nav-link position-relative dropdown-toggle">
                            <i class="ft-user font-medium-3 blue-grey darken-4"></i>
                            <p class="d-none">User Settings</p></a>
                        <div aria-labelledby="dropdownBasic3" class="dropdown-menu text-left dropdown-menu-right">
                            <a href="{{url('admin/user/'.\Illuminate\Support\Facades\Crypt::encrypt(\Illuminate\Support\Facades\Auth::id()))}}" class="dropdown-item py-1">
                                <i class="ft-user mr-2"></i><span>View Profile</span>
                            </a>

                            <a href="{{url('admin/logout')}}" class="dropdown-item py-1">
                                <i class="ft-user mr-2"></i><span>Log out</span>
                            </a>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>
