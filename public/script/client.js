
$('#red, #blue').css({
	height: $(window).height()/2,
	'line-height': $(window).height()/2 + 'px'
});

// get our websocket (automatically generated from server serving page)
var socket = io();

var client_number;
var currentdate = new Date();

// emit events to server
socket.on('client', function(data) {
	client_number = data;
	console.log(client_number);
	socket.emit('authorize', client_number);

	socket.on('authorize', function(res) {
		if(res == 'accept') {
			$("#red").click(function() {
				socket.emit('king', 'red');
			})
			$("#blue").click(function() {
				socket.emit('king', 'blue');
			})
		}
	})

	// respond to server events
	socket.on('tick', updateData)
	function updateData(data) {
		$('#red').html(data.red);
		$('#blue').html(data.blue);
	}
})