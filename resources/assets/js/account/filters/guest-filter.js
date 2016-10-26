/* Guest filter */

angular.module("account").service("GuestFilter", function($state, AuthService) {

    return function(event, toState) {
        if (toState.guestFilter && AuthService.isAuthenticated()) {

            // Prevent transition
            event.preventDefault();
            // Go to the home state
            $state.go("home");
        }
    };

});
