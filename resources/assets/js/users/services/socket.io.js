angular.module('users').service('io', function($rootScope, $window){
    return {
        resource: null,
        init: function(){
            if(this.resource) return this.resource;
            var _this = this;
               
            this.resource = $window.io.connect($window.clientAddress ,{
                forceNew: true,
                transports: [
                    'websocket',
                    'flashsocket',
                    'htmlfile',
                    'xhr-polling',
                    'jsonp-polling',
                    'polling'
                ]
            });

            this.resource.on('hb', function () {
                _this.resource.emit('hb', {beat: 1});
            });

            this.resource.on('disconnect', function () {
                $rootScope.$emit('socket:disconnect');
            });

            return this.init();
        },
        on: function(name, cb){
            this.init().on(name,cb);
        },
        emit: function(name,args){
            this.init().on(name,args);
        }
    };
});