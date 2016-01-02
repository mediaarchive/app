// node

var fs = require('fs');
var path_module = require('path');
var iconv = require('iconv-lite');
var exec = require('exec');
var mammoth = require("mammoth");

data.file = {};

data.file.get = function(path, callback){
    fs.readdir(global.main.settings.root_dir + path, function(e, r){
        if (e) {
            console.error(e);
            callback(false);
        }
        callback(r);
    })
};

data.file.exec = exec;

data.file.get_file = function(path){
    return new Promise(function(resolve, reject) {
        fs.readFile(global.main.settings.root_dir + path, (err, data) => {
            if (err) { 
                reject(false);
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
                resolve(data);
            }
            //else if (ext == '.doc') {}
            else if (ext == '.docx') {
                mammoth.extractRawText({buffer: data}).then(function(result){
                    var data = result.value; // The raw text
                    resolve(data);
                });
            }
            else
                resolve(data);
        });
    });
}