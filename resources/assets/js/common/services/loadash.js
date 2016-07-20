/* Loadash */

angular.module("common").factory("_", function($window) {

    /**
     * Beutify filesize
     * @param {type} bytes
     * @returns {String}
     */
    function bytesToSize(bytes) {
        if(bytes == 0) return '0 Byte';
        var k = 1000;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(2) + ' ' + sizes[i];
     }
    /**
     * Escape a regexp.
     *
     * @param str
     * @returns {string}
     */
    function escapeRegExp(str){
        if (str == null) return '';
        return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }

    /**
     * Default to whitespace.
     *
     * @param characters
     * @returns {*}
     */
    function defaultToWhiteSpace(characters) {
        if (characters == null)
            return '\\s';
        else if (characters.source)
            return characters.source;
        else
            return '[' + escapeRegExp(characters) + ']';
    }


    /**
     * Generate a new GUID.
     *
     * @returns {string}
     */
    function guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = Math.random() * 16|0;
            var v = c == "x" ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }


    /**
     * Trim a string.
     *
     * @param str
     * @param characters
     * @returns {string}
     */
    function trim(str, characters){
        if (str == null) return "";
        if ( ! characters && String.prototype.trim) return String.prototype.trim.call(str);
        characters = defaultToWhiteSpace(characters);
        return String(str).replace(new RegExp("\^" + characters + "+|" + characters + "+$", "g"), "");
    }

    /**
     * Camelize a string.
     *
     * @param str
     * @returns {string}
     */
    function camelize(str) {
        return trim(str).replace(/[-_\s]+(.)?/g, function(match, c) { return c ? c.toUpperCase() : ""; });
    }


    /**
     * Transform a string to underscored.
     *
     * @param str
     * @returns {string}
     */
    function underscored(str){
        return trim(str).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase();
    }


    /**
     * Slugify a string.
     *
     * @param str
     * @returns {string}
     */
    function slugify(str) {
        if (str == null) return "";

        var from  = "ąàáäâãåæăćęèéëêìíïîłńòóöôõøśșțùúüûñçżź",
            to    = "aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz",
            regex = new RegExp(defaultToWhiteSpace(from), "g");

        str = String(str).toLowerCase().replace(regex, function(c) {
            var index = from.indexOf(c);
            return to.charAt(index) || "-";
        });

        return dasherize(str.replace(/[^\w\s-]/g, ""));
    }


    /**
     *
     * Dasherize a string.
     *
     * @param str
     * @returns {string}
     */
    function dasherize(str){
        return trim(str).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase();
    }
    /**
     * 
     * @param {type} $search
     * @param {type} $key
     * @param {type} $values
     * @returns {Boolean}
     */
    function searchInArray($search, $key, $values)
    {
        var $i = false;
        for($i in $values)
        {
            if($values[$i][$key] === $search)
            {
                return $values[$i];
            }
        }
        
        return false;
    }
    
    // Extend lodash
    _.mixin({
        guid: guid,
        trim: trim,
        camelize: camelize,
        underscored: underscored,
        dasherize: dasherize,
        slugify: slugify,
        bytesToSize: bytesToSize,
    });

    return $window._;

});
