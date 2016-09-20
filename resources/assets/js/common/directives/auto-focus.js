/* Auto focus */

angular.module("common").directive("autoFocus", function() {
    return {
        restrict: "A",
        link: function(scope, el) {

            // Focus the element
            el.focus();
        }
    };

});
