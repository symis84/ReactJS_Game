var express = require('express'),
	browserify = require('browserify-middleware'),
	reactify = require('reactify'),
	less = require('less-middleware'),
	nunjucks = require('nunjucks'),
	config = require('./client/config');


// initialise express
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// use nunjucks to process view templates in express
nunjucks.configure('server/templates/views', {
    express: app
});

// less will automatically compile matching requests for .css files
app.use(less('public'));
// public assets are served before any dynamic requests
app.use(express.static('public'));

// common packages are precompiled on server start and cached
app.get('/js/' + config.common.bundle, browserify(config.common.packages, {
	cache: true,
	precompile: true
}));

// any file in /client/scripts will automatically be browserified,
// excluding common packages.
app.use('/js', browserify('./client/scripts', {
	external: config.common.packages,
	transform: ['reactify']
}));

/*
	set up any additional server routes (api endpoints, static pages, etc.)
	here before the catch-all route for index.html below.
*/

app.get('/', function(req, res) {
	// this route will respond to all requests with the contents of your index
	// template. Doing this allows react-router to render the view in the app.
    res.render('index.html');
});

app.get("/getName", function(req, res) {
	console.log("getName");
	res.json({ user: 'Guest' });
});

app.get("/setName", function(req, res) {
	console.log("setName: "+req.query.name);
	//save new name in DB and return 300 OK
	res.json({ msg: '300' });
});

app.get("/getListDress", function(req, res) {
	console.log("getListDress");
	res.json({ data: ["Red dress","Green dress","Pink dress","Blue dress","Orange dress","Yellow dress"] });
});

app.get("/getListFriends", function(req, res) {
	console.log("Name: "+req.query.name+" getListDress");
	if ( req.query.name == "Simone" ) {
		res.json({ data: ["Marco","John"] });
	}else if ( req.query.name == "Marco" ) {
		res.json({ data: ["Simone","Kevin"] });
	}
	
});

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

app.set('port', process.env.PORT || 3000);

http.listen(app.get('port'),
  function(){
    console.log("Express server listening on port " + app.get('port'));
});
