var socket = io();
var name = getQueryVariable('name') || 'User';
var room = getQueryVariable('room');

console.log(name + ' wants to join ' + room);

socket.on('connect', function (){
	console.log('Connected to socket.io server!');
});

socket.on('message', function (message){
	var momentTimestamp = moment.utc(message.timestamp);
	var $message = jQuery('.messages');

	console.log('New message:');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mma') + ':</strong></p>');
	$message.append('<p><span>' + message.text + '</span></p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event){
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});