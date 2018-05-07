var express =  require('express');

var app = express()

app.get('/', function(req, res) {
    res.send("This is the home page");
});

app.listen(3000);

console.log("Start listening port 3000");
