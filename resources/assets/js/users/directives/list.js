angular.module('users').directive('usersList', function ($window, $rootScope, UserService, SocketIO,
                                                         Twilio, AuthService) {

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
            $rootScope.$on('twilio:conversation-disconnected', function(){
                scope.inACall = false;
                scope.$apply();
            });
            var activeUsers = [];

            var socket = SocketIO.init();

            socket.emit('register', AuthService.getProfile());

            socket.on('register', function (client) {
                Twilio.init(client.client_token);
            });

            socket.on('users:list', function (users) {
                activeUsers = users;
                for(var i in scope.items){
                    scope.items[i].client_token = '';
                    scope.items[i].isActive = false;

                    for(j in activeUsers){
                        if(activeUsers[j]['id'] == scope.items[i]['id']){
                            scope.items[i]['client_token'] = activeUsers[j]['client_token'];
                            scope.items[i].isActive = true;
                        }
                    }
                }
                scope.$apply();
            });

            UserService.doSelectList().then(function (data) {
                for(var i in data){
                    data[i].client_token = '';
                    data[i].isActive = false;

                    for(var j in activeUsers){
                        if(activeUsers[j]['id'] == data[i]['id']){
                            data[i]['client_token'] = activeUsers[j]['client_token'];
                            data[i].isActive = true;
                        }
                    }
                }
                scope.items = data;
            });

            scope.preview = function () {
                $rootScope.$emit('twilio:preview', '.remote-media');
            };

            scope.call = function (id) {
                $rootScope.$emit('twilio:call', id);
            };
        }
    };
});