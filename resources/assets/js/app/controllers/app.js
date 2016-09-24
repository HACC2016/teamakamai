angular.module('app').controller('AppController', function ($rootScope, $state, AuthService, AUTH_EVENTS) {


    $rootScope.$on('error:outdated', function () {
        alert("Outdated browser");
    });

    $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
        $state.go('logout');
    });

    $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
        $state.go('logout');
    });

    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
        $state.go('logout');
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
        $state.go('home');
    });
});