(function () {

    return false; 
    if (!user || !user.id) return false;

    var socket = io.connect(clientAddress, {'forceNew': true});


    socket.emit('add user');
    socket.emit('register', user);
    socket.on('hb', function () {
        socket.emit('hb', {beat: 1});
    });

    socket.on('disconnect', function () {
        window.location = logoutURL;
    });

})();