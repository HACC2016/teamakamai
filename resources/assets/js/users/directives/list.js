angular.module('users').directive('usersList', function($window,$rootScope, UserService, io, Twilio){
    return {
        templateUrl: 'users/list.html',
        link: function(scope,element,arguments){

            UserService.doSelectList().then(function(data){
                scope.items = data;
            });

            Twilio.init();
            var socket = io.init();

            socket.emit('register', $window.user);

            scope.call = function(id){
                $rootScope.$emit('twilio:call', id);
            };
            setInterval(function(){
                socket.emit('users:list', {hb: 1});
            }, 400);

            socket.on('users:list', function(users){
                var items = scope.items;
                for(var i in items){
                    items[i].active = users.indexOf(items[i].id) >= 0;
                }
                scope.items = items;
                scope.$apply();
            });
        }
    };
});