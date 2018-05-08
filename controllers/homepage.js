var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({
    extended: false
});

var years = [2015, 2016, 2017, 2018];
var months = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12];
var days = [];
for (var i = 1; i <= 31; i++) {
    days.push(i);
}

module.exports = function(app) {
    app.get('/home', function(req, res) {
        res.render('home', {
            year: years,
            month: months,
            day: days
        });
    });
}