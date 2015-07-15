// node

var fs = require('fs');
var path_module = require('path');
var iconv = require('iconv-lite');
var exec = require('exec');

data.file = {
    
}

data.get = function(path, callback){
    fs.readdir(global.config.root_dir + path, function(e, r){
        if (e) {
            console.error(e);
            callback(false);
        }
        callback(r);
    })
}
data.exec = exec;
data.get_file = function(path, callback){
    fs.readFile(global.config.root_dir + path, function(err, data){
            if (err) {
                callback(false);
                console.error(err);
                return false;
            }
            
            var ext = path_module.extname(path);
            
            if (ext == '.txt') {
                iconv.extendNodeEncodings();
                data = data.toString('win1251');
                iconv.undoExtendNodeEncodings();
            }
            else if (ext == '.doc' ) {
                
            }
            
            callback(data);
            return true;
        }
    );
}