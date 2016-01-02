var main;

$(document).ready(function(){
    win.showDevTools();
        
    global.config = {}
    
    global.main = main = new Main();
    
    $('#update_index_button').click(function(){
        index_update();
    })
});