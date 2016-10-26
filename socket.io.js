require('dotenv').config();

var fs = require('fs');
var certificate = fs.readFileSync(process.env.SSL_CERT);
var privateKey = fs.readFileSync(process.env.SSL_KEY);

var app = require('express')();
var credentials = {key: privateKey, cert: certificate};
var https = require('https').Server(credentials, app);
var io = require('socket.io')(https);
var sql = require('./server/sql');
var users = require('./server/users');

io.set('heartbeat timeout', 4000);
io.set('heartbeat interval', 2000);

https.listen(process.env.SOCKET_PORT, function () {
    console.log('listening on *:' + process.env.SOCKET_PORT);
});

sql('update users set `client_token` = "";');

io.sockets.on('connection', function (socket) {
    var client = false;
    socket.join(socket.client.id);

    /**
     * Register to presence service
     */
    socket.on('user:register', function (_user) {
        client = _user;
        console.log("Client #%d registered (%s)", client.id, socket.client.id);

        sql('UPDATE users SET client_token = ? where id = ? ', [socket.client.id, client.id]);
        client.client_token = socket.client.id;

        users.addClient(client);
        io.sockets.emit('users:list', users.getData());
    });

    socket.on('call', function(to){
        console.log("%s %s is calling %s %s", client.first_name, client.last_name, to.first_name, to.last_name);
        socket.to(to).emit('call', client);
    });

    socket.on('disconnect', function () {
        if (client)  sql('update users set client_token = "" where id = ?', [client.id]);
        console.log("Client #%d \"%s %s\" disconnected (%s) ",client.id, client.first_name, client.last_name, socket.client.id );

        users.deleteClient(client);
        io.sockets.emit('users:list', users.getData());
    });

    socket.on('users:list', function(){
        socket.emit('users:list',users.getData());
    });
});