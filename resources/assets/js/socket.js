(function(){
    if(!user || !user.id) return false;


    var socket = io.connect(clientAddress, {
        transports: [ 'websocket','polling','flashsocket']
    });
    socket.on('disconnect',function(){
        window.location = logoutURL;
    });

    socket.emit('add user');
    socket.emit('register',user);
    socket.on('hb',function(){
        socket.emit('hb', {beat:1});
    });
    
    socket.on('incoming',function(){
        toastr.options.positionClass = "toast-bottom-right";
        toastr.success('You are getting a call!');
    });
})();