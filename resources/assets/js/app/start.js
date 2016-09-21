angular.module("app", [
    "ngAnimate", "ui.router",
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
            title: 'Welcome | TEAM AKAMAI',
            authFilter: true
        });
        $stateProvider.state('account:login', {
            url: '/login',
            templateUrl: 'account/views/auth/login.html',
            controller: 'LoginCtrl',
            title: 'Login | TEAM AKAMAI',
            hideHeader: 1,
            hideFooter: 1,
            guestFilter: true
        });

        $stateProvider.state('account:signup', {
            url: '/register',
            templateUrl: 'account/views/auth/signup.html',
            controller: 'SignupCtrl',
            title: 'Register | TEAM AKAMAI',
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
            title: 'Forgot password | TEAM AKAMAI',
            hideHeader: 1,
            hideFooter: 1,
            guestFilter: true
        });

        $stateProvider.state('account:reset', {
            url: '/account/reset-password/{token}',
            templateUrl: 'account/views/auth/reset.html',
            controller: 'ResetPasswordCtrl',
            title: 'Reset password | TEAM AKAMAI',
            hideHeader: 1,
            hideFooter: 1,
            guestFilter: true
        });

        $stateProvider.state('contact',{
            url:'/contact',
            template: 'Contact'
        });

    })
    .run(function ($rootScope, $state, $stateParams, URLTo,
                   AuthFilter, GuestFilter,TwilioFilter, APP) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // Set the base API URL
        URLTo.apiBase(APP.get());

        // Setup route filters
        $rootScope.$on("$stateChangeStart", AuthFilter);
        $rootScope.$on("$stateChangeStart", GuestFilter);
        $rootScope.$on("$stateChangeStart", TwilioFilter);
    });