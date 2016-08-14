angular.module('app').controller('AppController', function($rootScope){
    $rootScope.$on('twilio:incoming', function(event, invite){
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

    $rootScope.$on('error:outdated', function(){
        alert("Outdated browser");
    });
});