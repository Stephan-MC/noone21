<!DOCTYPE html>
<html lang="en" class="loading">
<!-- BEGIN : Head-->
<head>

    @include('includes.head')

</head>

<body data-col="2-columns" class=" 2-columns  layout-dark">
<!-- ////////////////////////////////////////////////////////////////////////////-->
<div class="wrapper">
    @include('includes.left_navigation')
    @include('includes.header')
    @yield('content')
</div>
    @include('includes.footer')

</body>

</html>
