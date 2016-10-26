angular.module('app').controller('AppController', function ($, $rootScope, $state, $log, $interval,
                                                            AuthService, AUTH_EVENTS, CALL_EVENTS) {

    $rootScope.$on('error:outdated', function () {
        alert("Outdated browser");
    });

    $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
        $state.go('account:logout');
    });

    $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
        $state.go('account:logout');
    });

    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
        $state.go('account:logout');
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
        $state.go('home');
    });

    $rootScope.$on(CALL_EVENTS.incomingCall, function(ev,user){
        $rootScope.$emit(confirm('Do you accept the call from '+user.first_name+' '+user.last_name+' ?' ) ? CALL_EVENTS.acceptCall : CALL_EVENTS.cancelCall, user);
    });
});