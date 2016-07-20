angular.module('users').service('Twilio', function($rootScope, $window){
    if (!$window.navigator.webkitGetUserMedia && !$window.navigator.mozGetUserMedia) {
        $rootScope.$emit('error:outdated');
    }
    var _twilio = $window.Twilio;

    if(!$window.clientToken){
        console.log('no token');
        return false;
    }


    return {
        client: '',
        manager: '',
        invite: '',
        activeConversation: '',
        init: function(){
            if(this.manager) return this;
            console.log('Twilio.init');

            this.manager = new _twilio.AccessManager($window.clientToken);
            this.client = new _twilio.Conversations.Client(this.manager);
            var _this = this;

            this.client.listen().then(function(){
                console.log("Connected to Twilio. Listening for incoming Invites as %s", _this.client.identity);


                _this.client.on('invite', function (invite) {
                    console.log('Incoming invite from: ' + invite.from);
                    this.invite = invite;
                    $rootScope.$emit('twilio:incoming', invite);
                });

            }, function (error) {
                console.log('Could not connect to Twilio: ', error);
            });

            $rootScope.$on('twilio:accept', function(){
                if(!_this.invite) return false;
                console.log('Accept call', invite);

                _this.invite.accept().then(function(conversation){
                    $rootScope.$emit('twilio:conversation-start', conversation);
                });
            });

            
            $rootScope.$on('twilio:call', function(ev,inviteTo){
                console.log('Calling %d', inviteTo);
                if (_this.activeConversation) {
                    // Add a participant to an active conversation
                    _this.activeConversation.invite(inviteTo);
                } else {
                    _this.client.inviteToConversation(inviteTo).then(function(conversation){
                        $rootScope.$emit('twilio:conversation-start', conversation);
                    }, function (error) {
                        console.log('Unable to create conversation', error);
                    });
                }
            });

            $rootScope.$on('twilio:conversation-start', function(ev, conversation){

                //conversation.localMedia.attach('#local-media');
                $rootScope.$emit('twilio:conversation-started', conversation);
                _this.activeConversation = conversation;

                // When a participant joins, draw their video on screen
                conversation.on('participantConnected', function (participant) {
                    $rootScope.$emit('twilio:participant-connected', participant);
                    // participant.media.attach('#remote-media');
                });

                // When a participant disconnects, note in log
                conversation.on('participantDisconnected', function (participant) {
                    $rootScope.$emit('twilio:participant-disconnected',participant);
                });

                // When the conversation ends, stop capturing local video
                conversation.on('disconnected', function (conversation) {
                    console.log("Connected to Twilio. Listening for incoming Invites as '" + _this.client.identity + "'");
                    conversation.localMedia.stop();
                    //conversation.disconnect();
                    _this.activeConversation = null;
                    $rootScope.$emit('twilio:conversation-disconnected', conversation);
                });
            });
        }
    };
});