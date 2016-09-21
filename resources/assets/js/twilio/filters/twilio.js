/* Twilio filter */

angular.module("twilio").service("TwilioFilter", function($state, Twilio) {
    return function(event, toState) {
        if(Twilio.disconnect()){
            event.preventDefault();
            return;
        }
        console.log('Not prevented');
    };
});
