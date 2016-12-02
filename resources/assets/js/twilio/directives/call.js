angular.module('twilio').directive('calls', function($rootScope,Twilio){
    return {
        link: function(scope,element,attrs){
            Twilio.init();
        }
    }
});