/* Auto blur on event */

angular.module("common").directive("autoBlurOn", function() {
    return {
        restrict: "A",
        link: function(scope, el, attrs) {
            scope.$on(attrs.autoBlurOn, function() {

                // Blur the element
                el.blur();
            });
        }
    };

});
