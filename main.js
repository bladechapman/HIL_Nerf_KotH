var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var readline = require('readline');

var html_dir = 'public';
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

// tell the app where to look for static files
app.use(express.static(html_dir))

// send index.html at '/'
app.get('/', function(req, res) {
	res.sendFile('/index.html');
})

var blue_score = 0;
var red_score = 0;
var cur_king = undefined;
// our individual websocket environment
io.on('connection', function(socket) {
	console.log('client connected');

	socket.on('authorize', function(data) {
		rl.question('\nInteract request: authorize? [y/n]', function(response) {
			if(response == 'y' || response == 'yes') {
				socket.emit('authorize', 'accept');
				console.log('authorized');
			}
			else {
				console.log('auth refused');
			}
		})
	})

	socket.on('king', function(data) {
		cur_king = data;
	})

	socket.on('disconnect', function() {
		console.log('client disconnected');
	})
})

// server keeps track of score - broadcasts this to all clients
setInterval(function() {
	if(cur_king == 'red') {red_score++; }
	else if(cur_king == 'blue') {blue_score++; }
	else {return; }

	io.emit('tick', {
		'red' : red_score,
		'blue' : blue_score,
		'king' : cur_king
	})
}, 1000);

// start the server
http.listen(3000, function() {
	console.log('listening on *:3000');
})