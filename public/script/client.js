
// get our websocket (automatically generated from server serving page)
var socket = io();

var client_number;
var currentdate = new Date();
var touched = false;

// emit events to server
// needs simplification (CSS changes)
socket.on('client', function(data) {
	client_number = data;
	console.log(client_number);
	socket.emit('authorize', client_number);

	socket.on('authorize', function(res) {
		if(res == 'accept') {
			new FastButton(document.getElementById('red'), function() {
				touched = true;
				socket.emit('king', 'red');
				$("#red").addClass("king");
				$("#red").removeClass("subject");
				$("#blue").removeClass("king");
				$("#blue").addClass("subject");
			});
			new FastButton(document.getElementById('blue'), function() {
				touched = true;
				socket.emit('king', 'blue');
				$("#blue").addClass("king");
				$("#blue").removeClass("subject");
				$("#red").removeClass("king");
				$("#red").addClass("subject");
			});
		}
	})
	// respond to server events
	socket.on('tick', updateData)
	function updateData(data) {
		$('#red').html(data.red);
		$('#blue').html(data.blue);
		if (!touched) {
			if(data.king == 'red') {
				$("#red").addClass("king");
				$("#red").removeClass("subject");
				$("#blue").removeClass("king");
				$("#blue").addClass("subject");
			}
			else if(data.king == 'blue') {
				$("#blue").addClass("king");
				$("#blue").removeClass("subject");
				$("#red").removeClass("king");
				$("#red").addClass("subject");
			}
		}
	}
})
