<!DOCTYPE html>
<html lang="en" ng-app="app" ng-controller="AppController">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="HandheldFriendly" content="true">

    <title ng-bind="$state.current.title" class="ng-binding">Team Akamai</title>
    <link href="{{ asset('assets/css/app.css') }}" rel="stylesheet">
</head>

<body>
<div class="body">
    <nav ng-nav ng-if="!$state.current.hideFooter" class="light-blue lighten-1" role="navigation"></nav>

    <div ui-view>
        <div class="center-align" id="getting-started">
            <p>
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw orange-text"></i>
            </p>
            <p class="blue-grey-text">Getting started</p>
        </div>
    </div>
</div>

<footer ng-if="!$state.current.hideFooter" class="page-footer orange ">
    <div class="footer-copyright">
        <div class="container">
            Made by <a class="orange-text text-lighten-3" href="https://dev.teamakamai.com">Team Akamai</a>
        </div>
    </div>
</footer>

@section('javascripts') @show

<script data-key="test" src="{{url('/')}}:{{env('SOCKET_PORT')}}/socket.io/socket.io.js"></script>
<script type="text/javascript" src="{!! asset('assets/js/vendor.js') !!}"></script>
<script type="text/javascript" src="{!! asset('assets/js/main.js') !!}"></script>
<script>
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
        a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-84491211-1', 'auto');
    ga('send', 'pageview');
</script>
</body>
</html>
