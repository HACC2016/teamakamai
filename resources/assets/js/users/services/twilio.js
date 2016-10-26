angular.module('users').service('Twilio', function ($rootScope, $window, $log,
                                                    $http, URLTo) {
    var _twilio = $window.Twilio;
    _twilio.urls = {
        token: 'users/token/client_token'
    };
    _twilio.client = '';
    _twilio.manager = '';
    _twilio.invite = '';
    _twilio.activeConversation = null;

    _twilio.init = function ($client_token) {
        if (!$window.navigator.webkitGetUserMedia && !$window.navigator.mozGetUserMedia) {
            $rootScope.$emit('error:outdated');
            return false;
        }

        $http.get(URLTo.api(this.urls.token, {client_token: $client_token})).then(function (response) {
            _twilio.manager = new _twilio.AccessManager(response.data.token);
            _twilio.client = new _twilio.Conversations.Client(response.data.token);
            $rootScope.$emit('twilio:connected', _twilio.client);
        });
    };

    _twilio.disconnect = function(){

        if(this.activeConversation === null){
            $log.info('[twilio] No conversation active - unable to disconnect');
            return false;
        }
        this.activeConversation.localMedia.stop();
        this.activeConversation.disconnect();
        this.activeConversation = null;
        $log.info('[twilio] Conversation closed - manual disconnect');

        return true;
    };


    $rootScope.$on('twilio:connected', function(ev,client){
        client.listen().then(function () {
            $log.info('[twilio] listening on channel - ', client.identity);
            client.on('invite', function (invite) {
                $rootScope.$emit('twilio:incoming', invite);
            });
        }, function (error) {
            $log.error('Could not connect to Twilio: ', error);
        });
    });

    // TODO: Move to controller / directive
    $rootScope.$on('twilio:incoming', function (ev, invite) {
        $log.info('[twilio] Incoming from ', invite.from);
        if (!confirm("Do you want to accept the call?")) return false;

        invite.accept().then(function (conversation) {
            $rootScope.$emit('twilio:conversation-start', conversation);
        });
    });

    // TODO: Move to controller / directive
    $rootScope.$on('twilio:conversation-started', function (ev, conversation) {
        $log.info('[twilio] call started');
        if(angular.element('.local-media').html() == '') conversation.localMedia.attach('.local-media');
    });

    // TODO: Move to controller / directive
    $rootScope.$on('twilio:participant-connected', function (ev, participant) {
        angular.element('.remote-media').append('<div class="participant-'+participant.identity+'"></div>');
        var items = angular.element('.remote-media > div');
        items.css({width: 100/items.length + '%'});
        participant.media.attach('.participant-'+participant.identity);
    });

    // TODO: Move to controller / directive
    $rootScope.$on('twilio:conversation-start', function (ev, conversation) {
        //conversation.localMedia.attach('#local-media');
        $log.info('[twilio] start (attach)');
        $rootScope.$emit('twilio:conversation-started', conversation);
        Twilio.activeConversation = conversation;

        // When a participant joins, draw their video on screen
        conversation.on('participantConnected', function (participant) {
            $log.info('[twilio] participant connected', participant.identity);
            $rootScope.$emit('twilio:participant-connected', participant);
        });

        // When a participant disconnects, note in log
        conversation.on('participantDisconnected', function (participant) {
            $log.info('[twilio] participant disconnected');
            angular.element('.remote-media > .participant-' + participant.identity).remove();
            var items = angular.element('.remote-media > div');
            items.css({width: 100/items.length + '%'});
            if(!items.length){
                $rootScope.$emit('twilio:end', conversation);
            }
        });
        conversation.on('disconnected', function(){
           $log.info('[twilio] disconnect event', arguments)
        });

        conversation.on('ended', function (conversation) {
            $log.info('[twilio] conversation ended');
            $rootScope.$emit('twilio:end', conversation);
            conversation.localMedia.stop();
            conversation.disconnect();
            _twilio.activeConversation = null;
        });
    });

    // TODO: Move to controller / directive
    $rootScope.$on('twilio:call', function (ev, inviteTo) {
        $log.info('[twilio] ' + (_twilio.activeConversation ? 'inviting to conversation' : 'calling ') ,inviteTo);

        if (_twilio.activeConversation) {
            _twilio.activeConversation.invite(inviteTo);
        } else {
            _twilio.client.inviteToConversation(inviteTo).then(function (conversation) {
                $rootScope.$emit('twilio:conversation-start', conversation);
            }, function (error) {
                $log.error('Unable to invite to conversation', error);
            });
        }
    });

    $rootScope.$on('twilio:preview', function (ev, target) {
        var previewMedia = new _twilio.Conversations.LocalMedia();
        _twilio.Conversations.getUserMedia().then( function (mediaStream) {
                previewMedia.addStream(mediaStream);
                previewMedia.attach(target || '#local-media');
            },  function (error) { $log.error('Unable to get MEDIA',error); }
        );
    });

    return _twilio;
});