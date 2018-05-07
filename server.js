var express = require('express');

var app = express();
//引入静态文件
app.use(express.static('./scripts'));
app.use(express.static('./css'));

app.get('/', function(req, res) {
    res.send('This is home page');
});

app.get('/home', function(req, res) {
    //这里如果用senfile，就可以直接写相对路径，sendfile('/pages/home.html)
    //但是官方推荐使用sendFile，只能使用绝对路径
    var dirname = 'D:\\Coding\\JS_Work\\WebServer';
    res.sendFile(dirname + '/pages/home.html');
})

app.listen(3000);

console.log('Start lisenting port 3000');
