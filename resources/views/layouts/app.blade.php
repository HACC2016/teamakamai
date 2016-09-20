<!DOCTYPE html>
<html lang="en" ng-app="app" ng-controller="AppController">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="HandheldFriendly" content="true">

    <title ng-bind="$state.current.title" class="ng-binding">TEAM AKAMAI</title>
    <link href="{{ asset('assets/css/app.css') }}" rel="stylesheet">
</head>
<body>
<nav ng-class="{visible: !$state.current.hideFooter}" class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container"><a id="logo-container" ui-sref="home" href="#" class="brand-logo">TEAM AKAMAI</a>
        <ul class="right hide-on-med-and-down">
            <li><a class="hide waves-effect waves-light" ui-sref="account:login">Login</a></li>
            <li><a class=" waves-effect waves-light" ui-sref="account:logout">Logout</a></li>
        </ul>
        <ul id="nav-mobile" class="side-nav">
            <li>
                <div class="userView">
                    Team AKAMAI
                </div>
            </li>
            <li>
                <div class="divider"></div>
            </li>
            <li><a ui-sref="account:logout" href="#">Logout</a></li>
        </ul>
        <a href="#" sidenav data-activates="nav-mobile" class="button-collapse"><i class="fa fa-list"></i></a>
    </div>
</nav>

<div ui-view>
    <div class="center-align" id="getting-started">
        <p>
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw orange-text"></i>
        </p>
        <p class="blue-grey-text">Getting started</p>
    </div>
</div>

<footer ng-class="{visible: !$state.current.hideFooter}" class="page-footer orange">
    <div class="container">
        <div class="row">
            <div class="col l6 s12">
                <h5 class="white-text">Company Bio</h5>
                <p class="grey-text text-lighten-4">
                    We are a team of college students working on this project like it's
                    our full time job. Any amount would help support and continue development on this project and is
                    greatly appreciated.
                </p>


            </div>
            <div class="col l3 s12">
                <h5 class="white-text">Settings</h5>
                <ul>
                    <li><a class="white-text" href="#!">Link 1</a></li>
                    <li><a class="white-text" href="#!">Link 2</a></li>
                    <li><a class="white-text" href="#!">Link 3</a></li>
                    <li><a class="white-text" href="#!">Link 4</a></li>
                </ul>
            </div>
            <div class="col l3 s12">
                <h5 class="white-text">Connect</h5>
                <ul>
                    <li><a class="white-text" href="#!">Link 1</a></li>
                    <li><a class="white-text" href="#!">Link 2</a></li>
                    <li><a class="white-text" href="#!">Link 3</a></li>
                    <li><a class="white-text" href="#!">Link 4</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-copyright">
        <div class="container">
            Made by <a class="orange-text text-lighten-3" href="https://dev.teamakamai.com">TEAM AKAMAI</a>
        </div>
    </div>
</footer>

@section('javascripts') @show

<script src="{{url('/')}}:{{env('SOCKET_PORT')}}/socket.io/socket.io.js"></script>
<script type="text/javascript" src="{!! asset('assets/js/vendor.js') !!}"></script>
<script type="text/javascript" src="{!! asset('assets/js/main.js') !!}"></script>
</body>
</html>