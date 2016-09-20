/* Login */

angular.module("account").controller("SignupCtrl", function ($scope, $state, AuthService, AUTH_EVENTS) {

    // Save AUTH_EVENTS on scope
    $scope.authEvents = AUTH_EVENTS;

    // Login data
    $scope.signupData = {
        firstname: '',
        lastname: '',
        email: "",
        password: "",
        password_confirmation: ""
    };

    // Whether credentials are invalid
    $scope.areCredentialsInvalid = false;

    /**
     * Log in with email and password.
     *
     * @param email
     * @param password
     */
    $scope.register = function (data) {

        // Login
        var promise = AuthService.signup(data);

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
