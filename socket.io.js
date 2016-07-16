require('dotenv').config();

var fs = require('fs');
var certificate = fs.readFileSync('./storage/ssl/cert.pem');
var privateKey = fs.readFileSync('./storage/ssl/key.pem');

var app = require('express')();
var credentials = {key: privateKey, cert: certificate};
var https = require('https').Server(credentials,app);
var io  = require('socket.io')(https);
var sql = require('./_node/sql');

https.listen(process.env.SOCKET_PORT, function(){
    console.log('listening on *:' + process.env.SOCKET_PORT);
});

io.on('connection', function (socket) {
    var client  = false;
    var timeout = null;
    console.log('connected', socket.client.id);

    setInterval(function () {
        socket.emit('hb', {beat: 1});
    }, 1000);
    socket.on('hb', function () {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(function () {
            socket.disconnect();
        }, 3000);
    });

    socket.on('register', function (user) {
        sql('UPDATE users SET client_token = ? where id = ? ', [socket.client.id, user.id]);
        client = user;
        console.log('user registered', socket.client.id, client);
    });

    socket.on('disconnect', function () {
        if (client) {
            sql('update users set client_token = "" where id = ?', [client.id]);
        }
        console.log('client disconnect', socket.client.id, client);
    });
});


