/* Guest filter */

angular.module("account").service("TokenFilter", function($state, AuthService) {

    return function(event, toState) {
        AuthService.refreshToken();
    };

});
