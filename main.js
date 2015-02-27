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

auth_cache = {};

var client_count = 0;
var blue_score = 0;
var red_score = 0;
var cur_king = undefined;
// our individual websocket environment
io.on('connection', function(socket) {
	console.log('client connected');

	socket.emit('client', client_count)
	client_count++;

	socket.on('authorize', function(data) {
		console.log('authorize request for client ' + data);
		auth_cache[data] = socket;
	})

	socket.on('king', function(data) {
		cur_king = data;
	})

	socket.on('disconnect', function() {
		console.log('client disconnected');
	})
})

rl.on('line', function(line) {
	var word_arr = line.trim().split(' ');
	var target_sock = parseInt(word_arr[word_arr.length - 1]);

	if(word_arr[0] == 'yes' && target_sock in auth_cache) {
		auth_cache[target_sock].emit('authorize', 'accept');
		console.log('client ' + target_sock + ' authorized');
		delete auth_cache[target_sock];
	}
	else if(word_arr[0] == 'no' && target_sock in auth_cache) {
		console.log('client ' + target_sock + ' denied');
		delete auth_cache[target_sock];
	}
	else {
		console.log('auth failed for');
	}
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