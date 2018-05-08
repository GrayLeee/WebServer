var express = require('express');
var bodyparser = require('body-parser');
var toController = require('./controllers/homepage')

var app = express();

//引入静态文件
app.use(express.static('./scripts'));
app.use(express.static('./css'));

//设置模板引擎
app.set('view engine', 'ejs');

toController(app);

app.listen(3000);

console.log('Start lisenting port 3000');
