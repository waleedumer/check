var cheerio = require('cheerio');
var request = require('request');
var fs      = require('fs');
var http = require('http');
var express = require('express'),
    path = require('path');
    var title;
    var image;
    var json = [];
    var tempdata={
      title:title,
      image:image
    }
 request ('https://yesmovies.to/',
  function (error, response, html){
    if(!error && response.statusCode == 200){
          console.log('page loaded');

      var $ = cheerio.load(html);




        var allRecords = $('.ml-mask');
        allRecords.each(function(index, element){
      title = $(element).find('.mli-info').children().first().text();
      image = $(element).find('img.thumb.mli-thumb.lazy').attr('data-original');
     tempdata={
        title:title,
        image:image
      }
       console.log(image);

        json.push(tempdata);

      });
  //  console.log('all records: ' + allRecords);
  function saveData(){
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

      //console.log('File successfully written! - Check your project directory for the output.json file');

  });
  }
  saveData();
  }
});
var app = express();
// var server = http.createServer(function(req, res){
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   fs.createReadStream(__dirname + '/views/index.html').pipe(res);
  // app.get('/', function(req,res){
  // res.sendFile(__dirname + '/views/index.html');
  // });



  //server.use(express.static(path.join(__dirname, 'public')));
// })


// //setup our app to use handlebars.js for templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// //add some standard express middleware
app.configure(function() {
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.static('static'));
});

// //routes


app.get('/', function(req, res) {
    res.render('index', {json: json});

});
app.get('/single.html', function(req, res) {
    res.render('single');

});

//
// //have our app listen on port 3000
app.listen(8084);
console.log('Your app is now running at: http://127.0.0.1:3000/');
