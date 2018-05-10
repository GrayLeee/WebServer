var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

connection.connect();

//准备解析数据
var data = [];
var years = [], months = [], days = [];
var yyy = [];
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

module.exports = function(app) {
    app.get('/home', function(req, res) {
        res.render('home', {
            year: years,
            month: months,
            day: days,
            data: data
        });
    });

    var bodyparser = require('body-parser');
    var jsonParser = bodyparser.json();

    //处理传输的json请求
    app.post('/home', jsonParser, function(req, res) {
        //保存数据到数据库, req应该是个json对象
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'test'
        });
        connection.connect();

        //构造数据
        var time = String(req.body.time);
        var temperature = String(req.body.temperature);
        var humidity = String(req.body.humidity);
        insertData = `INSERT INTO information (time, temperature, humidity) VALUES("${time}", ${temperature}, ${humidity})`;
        
        //插入数据
        connection.query(insertData);
        res.send(true);
    });
}