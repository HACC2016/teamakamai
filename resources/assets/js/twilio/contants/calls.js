/* Auth constants */

angular.module("twilio")
    .constant("CALL_EVENTS", {
        incomingCall: "socket:incoming",
        rejectCall: "socket:reject",
        acceptCall: "socket:accept",
        timeoutCall: "socket:timeout",
        cancelCall: "socket:canceled",
    });