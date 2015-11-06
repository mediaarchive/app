// node

var fs = require('fs');
var path_module = require('path');
var iconv = require('iconv-lite');
var exec = require('exec');
var mammoth = require("mammoth");

data.file = {};

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

                var new_data = data.toString('utf8');

                if(new_data.indexOf('�') !== -1)
                    new_data = data.toString('win1251');

                data = new_data;
                iconv.undoExtendNodeEncodings();
                callback(data);
            }
            else if (ext == '.doc' || ext == '.docx') {
                mammoth.extractRawText({path: "path/to/document.docx"}).then(function(result){
                    var data = result.value; // The raw text
                    callback(data);
                });
            }
            else
                callback(data);
        }
    );
}