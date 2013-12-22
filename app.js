var express = require('express')
  , ejs = require('ejs')
  , http = require('http')
  , path = require('path')
  , Poet = require('poet');

var app = express();

var poet = new Poet(app, {
  posts: './_posts/',
  postsPerPage: 5,
  metaFormat: 'json'
});

poet.watch(function () {
  // watcher reloaded
})
  .init().then(function () {
    // ready to go!
  });


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(path.join(__dirname, 'public/img/common/favicon.ico'))); 
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res, next){
  res.render('index');
});

//app.get('/rss', function (req, res) {
//  // Only get the latest posts
//  var posts = poet.helpers.getPosts(0, 5);
//  res.setHeader('Content-Type', 'application/rss+xml');
//  res.render('rss', { posts: posts });
//});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

