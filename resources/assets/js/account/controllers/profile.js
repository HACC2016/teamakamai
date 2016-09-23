angular.module('account').controller('ProfileCtrl',
    function ($scope, AuthService, $timeout, SessionService, AUTH_URLS, URLTo) {

        $scope.data = AuthService.getProfile();
        $scope.data.password = '';
        $scope.data.password_confirmation = '';
        $scope.success = false;
        $scope.fileUpload = {
            url: URLTo.api(AUTH_URLS.updateAvatar),
            options: {
                multi_selection: false,
                max_file_size: '32mb',
                headers: {
                    'Authorization': 'Bearer ' + SessionService.getId()
                }
            },
            callbacks: {
                filesAdded: function (uploader, files) {
                    $scope.loading = true;
                    $timeout(function () {
                        uploader.start();
                    }, 1);
                },
                uploadProgress: function (uploader, file) {
                    $scope.loading = file.percent / 100.0;
                },
                fileUploaded: function (uploader, file, response) {
                    $scope.loading = false;
                    var json = angular.fromJson(response.response);
                    SessionService.set('avatar', 'avatars/' + json.avatar);
                    $scope.data.avatar = 'avatars/' + json.avatar;
                },
                error: function (uploader, error) {
                    $scope.loading = false;
                }
            }
        };

        $scope.changeProfile = function ($data) {
            $scope.errors = [];
            $scope.success = false;

            AuthService.updateProfile($data)
                .then(function (response) {
                    $scope.success = true;
                    SessionService.setData(response.data.user);
                })
                .catch(function (response) {
                    $scope.errors = response.data.errors;
                });
        };

    });