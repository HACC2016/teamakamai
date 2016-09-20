/* Login */

angular.module("account").controller("LoginCtrl", function ($scope, $state, AuthService, AUTH_EVENTS, SessionService, MessagesService) {

    // Save AUTH_EVENTS on scope
    $scope.authEvents = AUTH_EVENTS;

    // Login data
    $scope.submitData = {
        email: "",
        password: ""
    };

    // Whether credentials are invalid
    $scope.areCredentialsInvalid = false;

    /**
     * Log in with email and password.
     *
     * @param email
     * @param password
     */
    $scope.login = function (submitData) {

        // Login
        var promise = AuthService.login(submitData.email, submitData.password);

        promise.then(function () {
            // User is logged in
            $state.go("home");
        });

        promise.catch(function () {
            // Invalid credentials
            $scope.areCredentialsInvalid = true;
        });
    };
});
