angular.module('users').service('UserService', function ($http, URLTo, Twilio) {
    this.doSelectList = function () {
        return $http.get(URLTo.api('users'))
            .then(function (response) {
                return response.data;
            });
    }
});