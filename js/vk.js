var BrowserWindow = require('electron').remote.BrowserWindow;

var vk = {
    start_auth: function(){
        var vk_auth_link = 'https://oauth.vk.com/authorize?client_id=' + config.api.vk.app_id + '&'+
            'redirect_uri=https://oauth.vk.com/blank.html&display=page&scope=groups,wall,photos,offline&response_type=token&v=5.37';
        // var vk_win = window.open(vk_auth_link);
        var vk_win = new BrowserWindow({ width: 800, height: 600, show: false });
        vk_win.loadURL(vk_auth_link);
        vk_win.show();
        
        var interval = setInterval(function(){
            var url = vk_win.getURL();
            if(url.indexOf('access_token') !== -1){
                vk_win.close();
                var hash = url.substr(url.indexOf('#') + 1);
                var settings = {}
                hash.split('&').forEach(function(item){
                    var item_obj = item.split('=');
                    settings[item_obj[0]] = item_obj[1];
                });
                
                main.settings.vk = settings;
                clearInterval(interval);
            }
        }, 100);
    },
    req: function(method, url, params, callback){
        $[method]('https://api.vk.com/method/' + url, params, callback);
    },
    get: function(url, params, callback){
        this.req('get', url, params, callback);
    },
    post: function(url, params, callback){
        this.req('post', url, params, callback);
    }
};