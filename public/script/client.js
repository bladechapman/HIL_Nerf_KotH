
$('#red, #blue').css({
	height: $(window).height()/2,
	'line-height': $(window).height()/2 + 'px'
});

// get our websocket (automatically generated from server serving page)
var socket = io();


var currentdate = new Date();
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

// emit events to server
socket.emit('authorize', currentdate);
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
