var main;

function debug() {
    //$.getScript('http://localhost:35729/livereload.js');
    // win.showDevTools();
}

$(document).ready(function(){
    // debug();
    
    // global.main = main = new Main();

    var socket = io();
    socket.on('connect', function(){
    	console.log('connected')
    });
});