/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

module.exports = function(server){

	global.io = require('socket.io')(server);

	global.io.on('connection', function (socket) {
		console.log(socket)
	});
}