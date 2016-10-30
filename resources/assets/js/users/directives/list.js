angular.module('users').directive('usersList', function ($window, $rootScope, UserService, SocketIO, AuthService, SessionService, $log, CALL_EVENTS ) {

    return {
        templateUrl: 'users/views/list.html',
        link: function (scope, element, arguments) {
            scope.search = '';
            scope.hidePreview = false;
            scope.inACall = false;

            $rootScope.$on('twilio:participant-connected', function(){
                scope.inACall = true;
                scope.$apply();
            });
            $rootScope.$on('twilio:end', function(){
                scope.inACall = false;
                scope.$evalAsync();
            });

            scope.disconnect = function(){
                Twilio.disconnect();
                scope.inACall = false;
            };
            var socket = SocketIO.init();

            socket.on('connect', function(){
                socket.emit('user:register', AuthService.getProfile());
            });

            socket.on('users:list', function (users) {
                UserService.doSelectList(users).then(function(response){
                    scope.items = response;
                });
            });

            socket.on('call', function(from){
                $log.info(arguments);
                $rootScope.$emit(CALL_EVENTS.incomingCall, from);
            });

            scope.call = function (id) {
                socket.emit('call', id);
            };
        }
    };
});