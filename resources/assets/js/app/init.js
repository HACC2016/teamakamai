angular.module("app", [
    "common", 'users'
])
    .config(function ($provide) {
        $provide.decorator('$rootScope', function ($delegate) {
            var _emit = $delegate.$emit;

            $delegate.$emit = function () {
                console.log.apply(console, arguments);
                _emit.apply(this, arguments);
            };

            return $delegate;
        });
    })
    .run(function () {
    });