/* Auth service */

angular.module("account").service("AuthService", function($rootScope, $state, $http,
                                                          URLTo, AUTH_URLS, AUTH_EVENTS, AUTH_HEADER_SESSION_ID,
                                                          SessionService) {

    this.loginWithData = function($data)
    {
        SessionService.create($data.token, $data.user);
        // Broadcast a login success event
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, $data);
    };

    /** 
     * Log the user in.
     *
     * @param email
     * @param password
     * @returns {*}
     */
    this.login = function (email, password) {

        var AuthService = this;
        var promise = $http.post(URLTo.api(AUTH_URLS.login), {
            email: email,
            password: password
        });

        promise.catch(function(response) {
            // Broadcast a login failed event
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed, response);
            return response;
        });

        return promise.then(function(response) {
            AuthService.loginWithData(response.data);
            return response;
        });

    };

    /**
     * Log the user in.
     *
     * @param email
     * @param password
     * @returns {*}
     */
    this.signup = function (data) {
        var AuthService = this;
        var promise = $http.post(URLTo.api(AUTH_URLS.register), {
            name: data.firstname + ' ' + data.lastname,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
        });

        promise.catch(function(response) {
            // Broadcast a login failed event
            $rootScope.$broadcast(AUTH_EVENTS.signupFailed, response);
            return response;
        });

        return promise.then(function(response) {
            AuthService.loginWithData(response.data);
            return response;
        });

    };


    /**
     * Check if user is authenticated.
     *
     * @returns {boolean}
     */
    this.isAuthenticated = function () {
        return !! SessionService.getId();
    };

    /**
     * Log the user out.
     *
     * @returns {*}
     */
    this.logout = function($noredirect) {
        $http
            .post(URLTo.api(AUTH_URLS.logout))
            .then(function(response) {
                // Destroy session
                SessionService.destroy();
                // Broadcast a logout success event
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess, response);
                if(!$noredirect)
                {
                    $state.go('account:login');
                }
                return response;
            });
    };


    /**
     * Request password reset.
     *
     * @param email
     * @returns {HttpPromise}
     */
    this.requestPasswordReset = function(email) {
        return $http.post(URLTo.api(AUTH_URLS.requestPasswordReset), {
            email: email
        });
    };


    /**
     * Validate password reset token.
     *
     * @param email
     * @param token
     * @returns {HttpPromise}
     */
    this.validatePasswordResetToken = function(email, token) {
        return $http
            .post(URLTo.api(AUTH_URLS.validatePasswordResetToken), {
                email: email,
                token: token
            })
            .then(function(response) {
                return response.data.userId;
            });
    };


    /**
     * Reset password.
     *
     * @param data
     * @param $token
     * @returns {HttpPromise}
     */
    this.resetPassword = function(data, $token) {
        return $http.post(URLTo.api(AUTH_URLS.resetPassword, {token: $token}), data);
    };

    this.getProfile = function(){
        return SessionService.getData();
    };

    /**
     * 
     * @param {type} $token
     * @returns {unresolved}
     */
    this.checkToken = function($token)
    {
        return $http.get(URLTo.api(AUTH_URLS.resetPassword, {token: $token}));
    };

    this.updateProfile = function($data){
        var promise = $http.post(URLTo.api(AUTH_URLS.updateProfile), $data);
        promise.then(function(response){
            return response.data;
        })

        return promise;
    }
});
