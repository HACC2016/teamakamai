var conversationsClient;
var activeConversation;

// Check for WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
    alert('WebRTC is not available in your browser.');
}
var accessManager = new Twilio.AccessManager(clientToken);

// Create a Conversations Client and connect to Twilio
conversationsClient = new Twilio.Conversations.Client(accessManager);
conversationsClient.listen().then(clientConnected, function (error) {
    log('Could not connect to Twilio: ' + error.message);
    console.log(error);
});

// Successfully connected!
function clientConnected() {
    //document.getElementById('invite-controls').style.display = 'block';
    log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");

    conversationsClient.on('invite', function (invite) {
        log('Incoming invite from: ' + invite.from);
        invite.accept().then(conversationStarted);
    });

    $('[data-call]').on('click',function () {
        var inviteTo = $(this).data('call');
        console.log('Calling %d', inviteTo);
        
        if (activeConversation) {
            // Add a participant
            activeConversation.invite(inviteTo);
        } else {
            conversationsClient.inviteToConversation(inviteTo).then(conversationStarted, function (error) {
                log('Unable to create conversation');
                console.error('Unable to create conversation', error);
            });
        }
    });
}
// Conversation is live
function conversationStarted(conversation) {
    log('In an active Conversation');
    activeConversation = conversation;
    $('#conversation').modal('show');
    // Draw local video, if not already previewing
    conversation.localMedia.attach('#local-media');


    // When a participant joins, draw their video on screen
    conversation.on('participantConnected', function (participant) {
        log("Participant '" + participant.identity + "' connected");
        participant.media.attach('#remote-media');
    });

    // When a participant disconnects, note in log
    conversation.on('participantDisconnected', function (participant) {
        log("Participant '" + participant.identity + "' disconnected");
    });

    // When the conversation ends, stop capturing local video
    conversation.on('disconnected', function (conversation) {
        log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");
        conversation.localMedia.stop();
        conversation.disconnect();
        activeConversation = null;
    });
}
// Activity log
function log(message) {
    return console.log(message);
}