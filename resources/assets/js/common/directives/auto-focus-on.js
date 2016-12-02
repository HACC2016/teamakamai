/* Auto focus on event */

angular.module("common").directive("autoFocusOn", function() {
    return {
        restrict: "A",
        link: function(scope, el, attrs) {
            scope.$on(attrs.autoFocusOn, function() {

                // Focus the element
                el.focus();
            });
        }
    };

});
