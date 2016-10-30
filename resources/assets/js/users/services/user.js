angular.module('users').service('UserService', function ($http, URLTo) {
    this.users = false;

    this.doSelectList = function (activeUsers, forceReload) {

        if(this.users && !forceReload){
            return this.users.then(function(users){
                for(var i in users){
                    users[i].client_token = this.isUserActive(users[i], activeUsers);
                }
                return users;
            }.bind(this));

        }

        this.users = $http.get(URLTo.api('users'))
            .then(function (response) {
                return response.data;
            });
        return this.doSelectList(activeUsers);
    };

    this.isUserActive = function($user, $activeArray){
        for(var i in $activeArray){
            if($activeArray[i].id == $user.id) {
                return $activeArray[i].client_token;
            }
        }
        return false;
    };
});
