angular.module('users').service('SocketIO', function($rootScope, $window, $log){
    var SocketIO = {};
    SocketIO.io = $window.io;
    SocketIO.resource = false;
    /**
     * Initialize the SocketIO connection
     * @returns {boolean|*}
     */
    SocketIO.init = function(){
        if(SocketIO.resource) return SocketIO.resource;

        SocketIO.resource = SocketIO.io.connect(window.location.host + ':3000' ,{
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

        SocketIO.resource.on('disconnect', function(){
            SocketIO.resource = false;
            $rootScope.$emit('socket:disconnect');
        });
        SocketIO.resource.on('call', function($user){
            $rootScope.$emit('socket:call', $user);
        });
        return SocketIO.resource;
    };
    return SocketIO;
});