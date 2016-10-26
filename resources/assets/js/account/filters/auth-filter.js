/* Auth filter */
angular.module("account").service("AuthFilter", function($state, AuthService) {
    return function(event, toState) {
        if (toState.authFilter && ! AuthService.isAuthenticated()) {
            // Prevent transition
            event.preventDefault();
            // Go to the home state
            $state.go("account:login");
        }
    };
});
