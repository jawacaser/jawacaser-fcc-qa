/*global io*/
let socket = io();
socket.on('user', function(data) {
  $('#num-users').text(data.currentUsers + ' users online');
  let message =
    data.name + (data.connected ? ' has joined the chat' : ' has left the chat.');
  $('#messages').append($('<li>').html('<br>' + message + '</br>'));
});

socket.on('chat message', function(data) {
  $('#messages').append($('<li>').text(`${data.name}: ${data.message}`));
});

$(document).ready(function () {
  // Form submittion with new message in field with id 'm'
  $('form').submit(function () {
    var messageToSend = $('#m').val();
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
});
