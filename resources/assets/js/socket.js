(function () {
    if (!user || !user.id) return false;

    var socket = io.connect(clientAddress, {
        transports: ['websocket', 'polling','flashsocket'],
        path: '/user-' + user.id,

    });

    socket.on('disconnect', function () {
        window.location = logoutURL;
    });

    socket.emit('add user');
    socket.emit('register', user);
    socket.on('hb', function () {
        socket.emit('hb', {beat: 1});
    });
})();