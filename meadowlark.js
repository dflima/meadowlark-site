var express = require('express');
var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('Meadowlark Travel');
});

app.get('/about', function(req, res) {
    res.type('text/plain');
    res.send('About Meadowlark Travel');
});

// Custom 404 page
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found.');
});

// Custom 500 page
app.use(function(req, res) {
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server error.');
});

app.listen(app.get('port'), function() {
    console.log('Express started on localhost:'+app.get('port')+'; press Ctrl+C to terminate.');
});
