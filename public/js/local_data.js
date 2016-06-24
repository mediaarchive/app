var local_data = {
    get: function(key){
        var data = localStorage[key];

        if (data != '' && data != null && typeof data !== 'undefined' && data !== 'undefined'){
            try {
                return JSON.parse(data);
            }
            catch (e) {
                console.error('json parse error', e);
                return undefined;
            }
        }
        else
            return undefined;
    },
    set: function(key, value){
        localStorage[key] = JSON.stringify(value);
    }
};
