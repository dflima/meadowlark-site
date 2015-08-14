var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var fortunes = [
    'Conquer your fears or they will conquer you.',
    'Rivers need springs.',
    'Do not feat what you don\'t know.',
    'You will have a pleasant surprise.',
    'Whenever possible, keep it simple.',
];

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname+'/public'));

app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about', {fortune: randomFortune, pageTestScript: '/qa/tests-about.js'});
});

// Custom 404 page
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

// Custom 500 page
app.use(function(req, res) {
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on localhost:'+app.get('port')+'; press Ctrl+C to terminate.');
});
