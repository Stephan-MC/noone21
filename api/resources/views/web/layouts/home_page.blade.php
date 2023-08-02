<head>
    @include('web.includes.head')
</head>

<body>

<div class="wrapper">
    <div class="preloader"></div>

    @include('web.includes.navigation')

    @yield('content')

    @include('web.includes.footer')

</div>
</body>