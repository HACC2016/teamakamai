angular.module('account').directive('ngNav', function(AuthService){
    return {
        templateUrl: 'account/views/directives/profile.html',
        link: function(scope, element, attrs){
            scope.user = AuthService.getProfile();
            scope.isAuthenticated = AuthService.isAuthenticated();
        }
    };
});