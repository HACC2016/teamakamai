/* Forgot password */

angular.module("account").controller("ResetPasswordCtrl", function($scope,$stateParams, $state, AuthService) {

    $scope.formData = {
        password: "",
        password_confirm: ""
    };

    $scope.passwordReset = function(data) {
        AuthService
            .resetPassword(data, $stateParams.token)
            .then(function(response) {
                AuthService.loginWithData(response.data);
            }, function($data){
                $scope.errors = $data.data.errors;
            });

    };

});
