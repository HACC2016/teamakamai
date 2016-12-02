angular.module("common").directive("close", function() {
    return {
        restrict: "A",
        link: function(scope, el, attrs) {
            el.find('button').click(function(){
                el.slideUp(300);
            });
        }
    };

});
