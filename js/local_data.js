var local_data = {
    get: function(key){
        var data;
        if (site) 
            data = getcookie(key);
        else
            data = localStorage[key];
        
        if (data != '' && data != null && data != undefined) 
            return JSON.parse(data);
        else
            return null;
    },
    set: function(key, value){
        if (site) 
            setcookie(key, JSON.stringify(value), (new Date()).getTime() + 1000 * 60 * 60 * 24 * 30 * 12);
        else
            localStorage[key] = JSON.stringify(value);
    }
}