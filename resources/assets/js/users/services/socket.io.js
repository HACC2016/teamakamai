angular.module('users').service('SocketIO', function($rootScope, $window){
    var SocketIO = $window.io;

    SocketIO.resource = false;

    SocketIO.init = function(){
        if(this.resource) return this.resource;

        var resource = SocketIO.connect(window.location.host + ':3000' ,{
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

        resource.on('hb', function () {
            this.emit('hb', {beat: 1});
        });

        resource.on('disconnected', function(){
            resource = false;
            $rootScope.$emit('socket:disconnect');
        });

        this.resource = resource;

        return this.resource;
    };
    return SocketIO;
});