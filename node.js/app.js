var express = require('express'),
    path = require('path');

//create our express app
var app = express();
//setup our app to use handlebars.js for templating
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//add some standard express middleware
app.configure(function() {
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.static('static'));
});

//routes
app.get('/', function(req, res) {
    res.render('index');

});


//have our app listen on port 3000
app.listen(8083);
console.log('Your app is now running at: http://127.0.0.1:3000/');
