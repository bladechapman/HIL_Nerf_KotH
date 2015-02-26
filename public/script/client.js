
$('#red').css({height: $(window).height()/2});
$('#blue').css({height: $(window).height()/2});

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
socket.on('tick', updateData)
function updateData(data) {
	console.log(data);
	$('#red').html(data.red);
	$('#blue').html(data.blue);
}
