require('dotenv').config();

var fs = require('fs');
var certificate = fs.readFileSync(process.env.SSL_CERT);
var privateKey = fs.readFileSync(process.env.SSL_KEY);

var app = require('express')();
var credentials = {key: privateKey, cert: certificate};
var https = require('https').Server(credentials,app);
var io  = require('socket.io')(https);
var sql = require('./server/sql');

https.listen(process.env.SOCKET_PORT, function(){
    console.log('listening on *:' + process.env.SOCKET_PORT);
});

sql('update users set `client_token` = "";');
var users = [];
function deleteUser(user,users){
    for(var i in users){
        if(users[i]['id'] == user.id){
            users.splice(i,1);
        }
    }
    return users;
}

io.on('connection', function (socket) {
    var client  = false;
    var timeout = null;
    // console.log('connected', socket.client.id);

    setInterval(function () {
        socket.emit('hb', {beat: 1});
    }, 1000);

    socket.on('hb', function () {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(function () {
            socket.disconnect();
        }, 3500);
    });

    socket.on('register', function (user) {
        client = user;

        sql('UPDATE users SET client_token = ? where id = ? ', [socket.client.id, client.id]);
        client.client_token = socket.client.id;

        users.push(client);
        console.log('client registered', socket.client.id, client.id);

        io.sockets.emit('users:list', users );
        socket.emit('register', client);
    });

    socket.on('disconnect', function () {
        if (client)  sql('update users set client_token = "" where id = ?', [client.id]);

        console.log('client disconnect', socket.client.id, client.id);
        io.sockets.emit('users:list',deleteUser(client,users));
    });

    socket.on('users:list', function(){
        socket.emit('users:list', users);
    });
});


