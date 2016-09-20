angular.module('users').service('Twilio', function ($rootScope, $window, $log,
                                                    $http, URLTo) {
    var _twilio = $window.Twilio;
    _twilio.urls = {
        token: 'users/token/client_token'
    };
    _twilio.client = '';
    _twilio.manager = '';
    _twilio.invite = '';
    _twilio.activeConversation = '';

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

    $rootScope.$on('twilio:connected', function(ev,client){
        client.listen().then(function () {
            $log.info('Twilio listening on channel - ', client.identity);
            client.on('invite', function (invite) {
                $rootScope.$emit('twilio:incoming', invite);
            });
        }, function (error) {
            $log.error('Could not connect to Twilio: ', error);
        });
    });

    // TODO: Move to controller / directive
    $rootScope.$on('twilio:incoming', function (ev, invite) {
        $log.info('Incoming');
        if (!confirm("Do you want to accept the call?")) return false;

        invite.accept().then(function (conversation) {
            $rootScope.$emit('twilio:conversation-start', conversation);
        });
    });

    // TODO: Move to controller / directive
    $rootScope.$on('twilio:conversation-started', function (ev, conversation) {
        $log.info('Twilio started');
        conversation.localMedia.attach('.local-media');
    });

    // TODO: Move to controller / directive
    $rootScope.$on('twilio:participant-connected', function (ev, conversation) {
        $log.info('Twilio connected');
        conversation.media.attach('.remote-media');
    });

    // TODO: Move to controller / directive
    $rootScope.$on('twilio:conversation-start', function (ev, conversation) {
        //conversation.localMedia.attach('#local-media');
        $log.info('Twilio start (attach)');
        $rootScope.$emit('twilio:conversation-started', conversation);
        Twilio.activeConversation = conversation;

        // When a participant joins, draw their video on screen
        conversation.on('participantConnected', function (participant) {
            $rootScope.$emit('twilio:participant-connected', participant);
        });

        // When a participant disconnects, note in log
        conversation.on('participantDisconnected', function (participant) {
            $rootScope.$emit('twilio:participant-disconnected', participant);
        });

        // When the conversation ends, stop capturing local video
        conversation.on('disconnected', function (conversation) {
            conversation.localMedia.stop();
            Twilio.activeConversation = null;
            $rootScope.$emit('twilio:conversation-disconnected', conversation);
        });
    });

    // TODO: Move to controller / directive
    $rootScope.$on('twilio:call', function (ev, inviteTo) {
        $log.info(Twilio.activeConversation ? 'inviting to conversation' : 'calling ',inviteTo);

        if (Twilio.activeConversation) {
            Twilio.activeConversation.invite(inviteTo);
        } else {
            Twilio.client.inviteToConversation(inviteTo).then(function (conversation) {
                $rootScope.$emit('twilio:conversation-start', conversation);
            }, function (error) {
                $log.error('Unable to invite to conversation', error);
            });
        }
    });

    $rootScope.$on('twilio:preview', function (ev, target) {
        var previewMedia = new Twilio.Conversations.LocalMedia();
        Twilio.Conversations.getUserMedia().then( function (mediaStream) {
                previewMedia.addStream(mediaStream);
                previewMedia.attach(target || '#local-media');
            },  function (error) { $log.error('Unable to get MEDIA',error); }
        );
    });

    return _twilio;
});