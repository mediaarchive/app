var main;

function debug() {
    //$.getScript('http://localhost:35729/livereload.js');
    win.showDevTools();
}

$(document).ready(function(){
    debug();
    
    global.config = {}
    global.main = main = new Main();
    
    $('#update_index_button').click(function(){
        index_update();
    });
});