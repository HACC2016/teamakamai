angular.module("app").service("UsersService", function ($rootScope, $http) {
    this.doSelectUsers = function () {
        return $http.post(URLTo.api('/api/users'), function ($response) {
            return $response.data;
        });
    }
});