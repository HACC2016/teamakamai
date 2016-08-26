angular.module('common').factory('URLTo', function($window){
    return $window.URLTo;
});
angular.module('common').filter('url', function(URLTo){
    return function(input){
        return URLTo.page(input);
    }
});