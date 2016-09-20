angular.module('users').service('UserService', function ($http, URLTo) {
    this.doSelectList = function () {
        var $this = this;
        return $http.get(URLTo.api('users'))
            .then(function (response) {
                var data = [];

                for (i in response.data) {
                    item = response.data[i];
                    item.avatar = $this.getAvatar();
                    data.push(item);
                }
                return data;
            });
    };

    this.getAvatar = function () {
        var avatars = [
            "Fan.png",
            "FootPrint.png",
            "GreenLeaf.png",
            "OrangeLeaf.png",
            "PinkLeaf.png",
            "Popsicle.png",
            "Shell.png",
            "Slippers.png",
            "StarFish.png",
            "Sun.png",
            "SunFlower.png",
            "SurfBoard.png",
            "WhiteLeaf.png"
        ];
        return 'assets/img/avatar/' + avatars[Math.floor(Math.random() * avatars.length)];
    };
});