/* Auth interceptor */

angular.module("account").factory("AuthInterceptor", function($rootScope, $q, AUTH_EVENTS, AUTH_HEADER_SESSION_ID, SessionService) {
    return {

        /**
         * Request interceptor.
         *
         * @param config
         * @returns {*}
         */
        request: function(config) {

            // Get session id
            var sessionId = SessionService.getId();

            // Set session id header
            if (sessionId) {
                config.headers = config.headers || {};
                config.headers[AUTH_HEADER_SESSION_ID] = 'Bearer ' + sessionId;
            }

            return config;
        },

        response: function(response){

            if(response.headers('refresh-token'))
            {
                SessionService.setId(response.headers('refresh-token'));
            }
            return response;
        },

        /**
         * Response error interceptor.
         *
         * @param response
         * @returns {Promise}
         */
        responseError: function(response) {
            if (response.status === 401) {
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, response);
            }
            if (response.status === 403) {
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, response);
            }
            if (response.status === 419 || response.status === 440) {
                $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, response);
            }

            return $q.reject(response);
        }
    };

});
