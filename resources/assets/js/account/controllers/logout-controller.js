/* Logout */

angular.module("account").controller("LogoutCtrl", function(AuthService, $state) {
    AuthService.logout();    
    $state.go('home');
});
