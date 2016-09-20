angular.module('common').directive('sidenav', function(){
    return {
        link: function(scope, element,attributes){
            angular.element(element).sideNav();
        }
    };
});