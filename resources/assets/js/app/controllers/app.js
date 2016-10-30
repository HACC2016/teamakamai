angular.module('app').controller('AppController', function ($, $rootScope, $state, $log, $interval, $timeout,
                                                            AuthService, AUTH_EVENTS, CALL_EVENTS, Twilio) {

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
        $timeout(function(){  $rootScope.$emit(CALL_EVENTS.timeoutCall, user);  }, 500);
        $rootScope.$emit(confirm('Do you accept the call from '+user.first_name+' '+user.last_name+' ?' ) ? CALL_EVENTS.acceptCall : CALL_EVENTS.cancelCall, user);
    });

    $rootScope.$on(CALL_EVENTS.acceptCall, function(ev,user){
        $log.info('Accepted call from ', user.first_name, user.last_name);
        $rootScope.$emit('twilio:call', user.client_token);
        //logic to accept calls
    });

    $rootScope.$on(CALL_EVENTS.cancelCall, function(ev,user){
        $log.info('Canceled call from ', user.first_name, user.last_name);
        //logic to accept calls
    });

    $rootScope.$on(CALL_EVENTS.timeoutCall, function(ev,user){
        // $log.info('Timed out call from ', user.first_name, user.last_name);
        // logic to accept calls
        // we can't user browser alerts for this
    });
});