console.log('loaded javascript');

// get our websocket (automatically generated from server serving page)
var socket = io();

// emit events to server
$("#red").click(function() {
	socket.emit('king', 'red');
})
$("#blue").click(function() {
	socket.emit('king', 'blue');
})

// respond to server events
socket.on('init_data', updateData)
socket.on('tick', updateData)


function updateData(data) {
	console.log(data);
	$('#red_score').html('Red Score: ' + data.red);
	$('#blue_score').html('Blue Score: ' + data.blue);
}
