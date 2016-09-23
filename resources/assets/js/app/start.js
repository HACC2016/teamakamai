angular.module("app", [
    "ngAnimate", "ui.router", 'angular-plupload',
    "account", "common", "twilio", "users"
])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $uiViewScrollProvider) {
        // Register AuthInterceptor
        $httpProvider.interceptors.push("AuthInterceptor");

        // Use anchor scroll
        $uiViewScrollProvider.useAnchorScroll();
        //$locationProvider.html5Mode(true);
        //default url - home
        $urlRouterProvider.otherwise('/');
        // Home
        $stateProvider.state("home", {
            url: '/',
            templateUrl: "app/views/home.html",
            controller: "HomeCtrl",
            title: 'Welcome | Team Akamai',
            authFilter: true
        });
        $stateProvider.state('account:login', {
            url: '/login',
            templateUrl: 'account/views/auth/login.html',
            controller: 'LoginCtrl',
            title: 'Login | Team Akamai',
            hideHeader: 1,
            hideFooter: 1,
            guestFilter: true
        });

        $stateProvider.state('account:signup', {
            url: '/register',
            templateUrl: 'account/views/auth/signup.html',
            controller: 'SignupCtrl',
            title: 'Register | Team Akamai',
            hideHeader: 1,
            hideFooter: 1,
            guestFilter: true
        });

        $stateProvider.state('account:logout', {
            url: '/logout',
            controller: 'LogoutCtrl',
            authFilter: true
        });

        $stateProvider.state('account:recover', {
            url: '/account/forgot-password',
            templateUrl: 'account/views/auth/recover.html',
            controller: 'ForgotPasswordCtrl',
            title: 'Forgot password | Team Akamai',
            hideHeader: 1,
            hideFooter: 1,
            guestFilter: true
        });

        $stateProvider.state('account:reset', {
            url: '/account/reset-password/{token}',
            templateUrl: 'account/views/auth/reset.html',
            controller: 'ResetPasswordCtrl',
            title: 'Reset password | Team Akamai',
            hideHeader: 1,
            hideFooter: 1,
            guestFilter: true
        });

        $stateProvider.state('account:profile', {
            url: '/account/profile',
            templateUrl: 'account/views/profile.html',
            controller: 'ProfileCtrl',
            title: 'Profile | Team Akamai',
            authFilter: true
        });

    })
    .run(function ($rootScope, $state, $stateParams, URLTo, AuthFilter, GuestFilter, APP) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // Set the base API URL
        URLTo.apiBase(APP.get());

        // Setup route filters
        $rootScope.$on("$stateChangeStart", AuthFilter);
        $rootScope.$on("$stateChangeStart", GuestFilter);
    });