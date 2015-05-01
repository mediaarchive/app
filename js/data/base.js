var data = {
    __error: function(msg){
        console.error('data error', msg);
    },
    get: function(path, callback){
        __error('method not defined');
        callback()
    }
    
}