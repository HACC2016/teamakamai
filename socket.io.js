require('dotenv').config();
var io      = require('socket.io')(process.env.SOCKET_PORT);
// io.set('origins', '*localhost:' + process.env.SOCKET_PORT );

var mysql   = require('mysql').createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

function sql($query, arguments){
    if(!mysql.threadId)
    mysql.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('SQL connected as id ' + mysql.threadId);
    });
    var data = [];
    var rows = 0;

    mysql.query($query, arguments || [], function(err,_data) {
        data = _data;
        rows = _data ? _data.length : 0;
        if (err) console.log(err);
    });

    return {
        data: data,
        rows: rows,
        query: $query,
        arguments: arguments
    };
}

io.on('connection', function (socket) {
    var client = false;
    var timeout = null;

    setInterval(function () {
        socket.emit('hb', {beat: 1});
    }, 1000);
    socket.on('hb', function () {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(function () {
            socket.disconnect();
        }, 3000);
    });

    socket.on('register',function(user){
        sql('UPDATE users SET client_token = ? where id = ? ', [ socket.client.id, user.id]);
        client = user;
        console.log('user registered', socket.client.id, client);
    });

    socket.on('disconnect', function () {
        if(client){
            sql('update users set client_token = "" where id = ?', [client.id]);
        }
        console.log('client disconnect', socket.client.id , client);
    });
});

