var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

connection.connect();

var data = [];
var years = [], months = [], days = [];

connection.query('SELECT * FROM information', function(err, rows, fileds) {
    if (err) {
        throw err;
    }
    for (var i = 0; i < rows.length; i ++) {
        //这里把时间解析成了字符数组，形式如[ 'Wed', 'May', '09', '2018', '09:52:18', 'GMT+0800', '(中国标准时间)' ]
        //这段代码真的很丑...
        var time = String(rows[i].time).split(' ');
        var record = {
            year: time[3],
            month: time[1],
            day: time[2],
            specify: time[4],
            temperature: rows[i].temperature,
            humidity: rows[i].humidity
        };
        data.push(record);
        years.push(time[3]);
        months.push(time[1]);
        days.push(time[2]);
    }
    years = years.filter(function(element, index, self) {
        return self.indexOf(element) === index;
    });
    months = months.filter(function(element, index, self) {
        return self.indexOf(element) === index;
    });
    days = days.filter(function(element, index, self) {
        return self.indexOf(element) === index;
    });

});

module.exports = function() {
    var all = {
        data: data,
        years: years,
        months: months,
        days: days
    };
    return all;
}