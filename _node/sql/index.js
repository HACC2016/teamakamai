var mysql = require('mysql').createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

sql = function($query, arguments) {
    if (!mysql.threadId)
        mysql.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('SQL connected as id ' + mysql.threadId);
        });
    var data = [];
    var rows = 0;

    mysql.query($query, arguments || [], function (err, _data) {
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

module.exports = sql;