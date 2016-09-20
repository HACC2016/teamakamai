/* Session service */

angular.module("account").service("SessionService", function(Cookies) {

    /**
     * Cookie key for session data.
     *
     * @type {string}
     */
    var cookieDataKey = "auth_session_data";


    /**
     * Cookie key for session id.
     *
     * @type {string}
     */
    var cookieIdKey = "access_token";


    /**
     * Create session.
     *
     * @param id
     * @param data
     */
    this.create = function(id, data) {
        this.setId(id);
        this.setData(data);
    };


    /**
     * Set the session id.
     *
     * @param id
     */
    this.setId = function(id) {
        Cookies.set(cookieIdKey, id);
    };


    /**
     * Return the session id.
     *
     * @returns {String}
     */
    this.getId = function() {
        return Cookies.get(cookieIdKey);
    };


    /**
     * Set the session data.
     *
     * @param data
     */
    this.setData = function(data) {
        Cookies.set(cookieDataKey, angular.toJson(data));
    };


    /**
     * Return the session data.
     * @param boolean $new Reload the data
     */
    this.getData = function($new) {
        return angular.fromJson(Cookies.get(cookieDataKey));       
    };


    /**
     * Destroy session.
     */
    this.destroy = function() {
        Cookies.expire(cookieIdKey);
        Cookies.expire(cookieDataKey);
    };


    /**
     * Set a value in session data.
     *
     * @param key
     * @param value
     * @returns {*}
     */
    this.set = function(key, value) {

        // Get the session data
        var sessionData = this.getData() || {};

        // Set the property
        sessionData[key] = value;

        // Save the session data
        this.setData(sessionData);

        return this;
    };


    /**
     * Get the value from session data.
     *
     * @param key
     * @param defaultValue
     * @returns {*}
     */
    this.get = function(key, defaultValue) {

        // Get the session data
        var sessionData = this.getData() || {};

        // Return the requested property
        return sessionData[key] || defaultValue;
    };


    /**
     * Remove the given key from session data.
     *
     * @param key
     * @returns {*}
     */
    this.remove = function(key) {

        // Get the session data
        var sessionData = this.getData() || {};

        // Delete property
        delete sessionData[key];

        // Save the session data
        this.setData(sessionData);

        return this;
    };
});
