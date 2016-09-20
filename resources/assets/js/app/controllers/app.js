angular.module('app').controller('AppController', function ($rootScope, $state, AuthService, AUTH_EVENTS) {


    $rootScope.$on('error:outdated', function () {
        alert("Outdated browser");
    });

    $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
        AuthService.logout();
    });

    $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
        AuthService.logout();
    });

    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
        AuthService.logout();
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
        $state.go('home');
    });
});