var local_data = {
    get: function(key){
        var data;
        data = localStorage[key];
        
        if (data != '' && data != null && data != undefined) 
            return JSON.parse(data);
        else
            return null;
    },
    set: function(key, value){
        localStorage[key] = JSON.stringify(value);
    }
}