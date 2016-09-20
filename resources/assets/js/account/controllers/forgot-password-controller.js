/* Forgot password */

angular.module("account").controller("ForgotPasswordCtrl", function($scope, $state, AuthService) {

    $scope.submitData = {
        email: ""
    };

    /**
     *
     * Send an email with password reset instructions.
     *
     * @param email
     */
    $scope.requestPasswordReset = function(data) {

        $scope.errors = '';
        $scope.message = '';

        AuthService
            .requestPasswordReset(data.email)
            .then(function() {
                $scope.submitData.email = '';
                $scope.message = 'Success! We\'ll send you an email with instructions on changing your password!';
            }, function($data){
                $scope.errors = $data.data.errors;
            });

    };

});
