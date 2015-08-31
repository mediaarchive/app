var vk = {
    init: function(){
        this.settings = local_data.get('vk');
        console.log(this.settings);
        if(typeof this.settings === 'undefined') {
            $("#vk_auth_start").click(function () {
                $(this).attr('disabled', 'disabled');
                vk.start_auth();
            });
        }
        else{
            $("#vk_auth_start").val('Загрузка...');
            this.get('users.get', {user_ids: this.settings.user_id}, function(res){
                console.log(res);
            });
        }
    },
    start_auth: function(){
        var vk_auth_link = 'https://oauth.vk.com/authorize?client_id=' + config.api.vk.app_id + '&'+
            'redirect_uri=https://oauth.vk.com/blank.html&display=page&scope=groups,wall&response_type=token&v=5.37';
        var vk_win = gui.Window.open(vk_auth_link);
        vk_win.show();
        vk_win.on('loaded', function(e){
            if(vk_win.window.location.hash.indexOf('access_token') !== -1){
                vk_win.close();
                var hash = vk_win.window.location.hash.replace('#', '');

                vk.settings = {};

                hash.split('&').forEach(function(item){
                    var item_obj = item.split('=');
                    vk.settings[item_obj[0]] = item_obj[1];
                });
                local_data.set('vk', vk.settings);
                vk.init();
            }
        });
    },
    req: function(method, url, params, callback){
        $[method]('https://api.vk.com/method/' + url, params, callback);
    },
    get: function(url, params, callback){
        this.req('get', url, params, callback);
    }
};