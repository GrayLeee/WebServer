var mysql = require('mysql');
    var bodyparser = require('body-parser');
    var jsonParser = bodyparser.json();
    var urlencodedParser = bodyparser.urlencoded({
        extended: false
    });

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

connection.connect();

var ConvertToNum = function(month) {
    var months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months.indexOf(month) + 1;
}

var TimeFormat = function(time) {
    var temp = String(time).split(' ');
    var formatTime = `${temp[3]}  ${ConvertToNum(temp[1])} ${temp[2]} ${temp[4]}`
    return formatTime;
}

//准备解析数据日期
//这里可以重构一下，把连接数据查询构造成一个函数
var years = [], months = [], days = [];
var yyy = [];
connection.query('SELECT * FROM information', function(err, rows, fileds) {
    if (err) {
        throw err;
    }
    for (var i = 0; i < rows.length; i++) {
        //这里把时间解析成了字符数组，形式如[ 'Wed', 'May', '09', '2018', '09:52:18', 'GMT+0800', '(中国标准时间)' ]
        var time = String(rows[i].time).split(' ');
        years.push(time[3]);
        months.push(ConvertToNum(time[1]));
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
            day: days
        });
    });

    //处理传输数据的请求
    app.post('/home', urlencodedParser, function(req, res) {
        //保存数据到数据库, req应该是个json对象
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
        console.log(req.body);
        res.send(true);
    });

    app.post('/data', urlencodedParser, function(req,res) {
        time = req.body;

        //在这里根据时间获取查询数据， 转换成时间戳
        //这里有一个小bug，月份必须减1，不然取不到当月数据
        var time_begin = new Date(time.b_year, time.b_month - 1, time.b_day) / 1000;
        var time_end = new Date(time.e_year, time.e_month - 1, time.e_day) / 1000;

        if (time_begin < time_end) {
            var getData = `SELECT * FROM information WHERE unix_timestamp(time) > ${time_begin} and unix_timestamp(time) < ${time_end}`;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                database: 'test'
            });
            connection.connect();
            connection.query(getData, function(err, rows, fileds) {
                if(err) {
                    throw err;
                } else {
                    var data = [];
                    for (var i = 0; i < rows.length; i++) {
                        var record = {
                            id: rows[i].id,
                            time: TimeFormat(rows[i].time),
                            temperature: rows[i].temperature,
                            humidity: rows[i].humidity
                        };
                        data.push(record);
                    }
                    res.send(data);
                    console.log(rows.length);
                }
            });
        } else {
            res.send('failed');
        }
    });
}