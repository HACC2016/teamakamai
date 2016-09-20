/* Check if an input has the same values as the reference */

angular.module("common").directive("equals", function() {
    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            ngModel: '=',
            equals: '='
        },
        link: function(scope, elem, attrs, ngModel) {

            // Do nothing if no ngModel
            if ( ! ngModel) return;

            // Validate
            function validate() {

                // Set validity
                ngModel.$setValidity("equals", scope.ngModel == scope.equals);
            }

            // Watch own value and re-validate on change
            scope.$watch('ngModel', function() {
                validate();
            });

            // Watch the other value and re-validate on change
            scope.$watch("equals", function () {
                validate();
            });
        }
    };

});
