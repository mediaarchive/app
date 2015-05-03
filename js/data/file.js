// node

var fs = require('fs');

data.file = {
    
}

data.get = function(path, callback){
    fs.readdir(global.config.file.root_dir + path, function(e, r){
        if (e.code == 'ENOTDIR') {
            
        }
        console.log(e,r)
    })
}

data.get_file = function(path, callback){
    fs.readFile(global.config.file.root_dir + path, function(err, data){
        if (err) {
            callback(false);
            console.error(err);
            return false;
        }
        callback(data);
        return true;
    })
}