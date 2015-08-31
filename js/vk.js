var vk_win;
var vk = {
    start_auth: function(){
        var vk_auth_link = 'https://oauth.vk.com/authorize?client_id=' + config.api.vk.app_id + '&'+
            'redirect_uri=https://oauth.vk.com/blank.html&display=page&scope=groups,wall&response_type=token&v=5.37';
        vk_win = gui.Window.open(vk_auth_link);
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
            }
        });

        //var vk_win = window.open();
        //vk_win.focus();
        //vk_win.onhashchange = function(){
        //    console.log(vk_win);
        //}
    }
};