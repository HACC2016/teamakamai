/* Focus the first erroneous input on form submit */

angular.module("common").directive("focusFirstErrorOnSubmit", function() {
    return {
        restrict: "A",
        link: function(scope, el, attrs) {

            var errorSelector = attrs.focusFirstErrorOnSubmit || ".form-control.ng-invalid";

            el.on("submit", function() {

                // Find the input and focus it
                el.find(errorSelector).first().focus();
            });
        }
    };

});
