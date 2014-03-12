var express = require('express')
  , fs = require('fs')
  , ejs = require('ejs')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , Poet = require('poet');

var $HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

var host = process.env['NODE_HOST']
  , port = process.env['NODE_PORT']
  , portHttps = process.env['NODE_PORT_HTTPS'];

var credentials = {
  key: fs.readFileSync(path.join($HOME, 'certificate', 'standardanalytics.key')),
  cert: fs.readFileSync(path.join($HOME, 'certificate', 'certificate-47444.crt')),
  ca: fs.readFileSync(path.join($HOME, 'certificate', 'GandiStandardSSLCA.pem'))
};


var app = express()
  , httpServer = http.createServer(app)
  , httpsServer = https.createServer(credentials, app);


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

app.get('/rss', function (req, res) {
  var posts = poet.helpers.getPosts(0, 5);
  res.setHeader('Content-Type', 'application/rss+xml');
  res.render('rss', { posts: posts });
});


httpServer.listen(port);
httpsServer.listen(portHttps);
console.log('Server running at http://127.0.0.1:' + port + ' (' + host + ')');
console.log('Server running at https://127.0.0.1:' + portHttps + ' (' + host + ')');

