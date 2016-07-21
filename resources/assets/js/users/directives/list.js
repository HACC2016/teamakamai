angular.module('users').directive('usersList', function($window,$rootScope, UserService, io, Twilio){
    return {
        templateUrl: 'users/list.html',
        link: function(scope,element,arguments){

            Twilio.init();
            var socket = io.init();

            socket.emit('register', $window.user);

            socket.on('reload-users', function(){
               
                UserService.doSelectList().then(function(data){
                    scope.items = data;
                });
            });

            scope.call = function(id){
                $rootScope.$emit('twilio:call', id);
            }

            $rootScope.$on('twilio:incoming', function(event, invite){
                console.log('Incoming call', invite);
                if(confirm('Do you accept a video call?'))
                invite.accept().then(function(conversation){
                    $rootScope.$emit('twilio:conversation-start', conversation);
                });
            });

            $rootScope.$on('twilio:conversation-started', function(ev,conversation){
                conversation.localMedia.attach('#local-media');
            });

            $rootScope.$on('twilio:participant-connected', function(ev,participant){

                participant.media.attach('#remote-media');
            });
        }
    };
});