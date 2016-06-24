var data = {
    __error: function(msg){
        console.error('data error', msg);
    },
    get: function(path, callback){
        data.__error('method get not defined');
        callback()
    },
    get_file: function(path, callback){
        data.__error('method get_file not defined');
        callback()
    }
}