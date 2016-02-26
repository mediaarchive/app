data.yadisk = {
    request: function(method, url, params, callback){
        method = method.toUpperCase();
        
        var settings = {
            method: method,
            url: "https://cloud-api.yandex.net:443/v1/disk/" + url,
            //dataType: "jsonp",
            data: params,
            success: function( response ) {
                callback(response);
            }
        };
        
        if (params.raw_url == true) 
            settings.url = url;
            
        if (params.jsonp == true) 
            settings.dataType = "jsonp";
        
        delete settings.raw_url;
        delete settings.dataType;
        
        if (data.yadisk.token != undefined && data.yadisk.token != '') {
            console.log(1)
            settings.beforeSend = function(xhr, settings) {
                xhr.setRequestHeader('Authorization', 'OAuth ' + data.yadisk.token);
            } 
            //settings.headers = {
            //    Authorization: 'OAuth ' + data.yadisk.token
            //};
        }
        console.log(data.yadisk.token, settings)
        $.ajax(settings);
    },
    auth: function(callback){
        
        function error(){
            alert('Нет доступа к Яндекс.Диску - невозможно продолжить работу.');
            callback(false);
        }
        
        var cookie = local_data.get('yadisk_token');
        if (cookie == null) {
            if (confirm('Для продолжения нужно войти на Яндекс.Диск. Продолжить?')) {
                var win = window.open(
                    'https://oauth.yandex.ru/authorize?client_id=' + global.config.yadisk.id + '&response_type=token',
                    'yandexauth',
                    'width=500,height=500,resizable=yes,scrollbars=yes,status=yes'
                );
                
                win.focus();
                console.log(win);
                var code = prompt('Напишите сюда появившийся код');
                
                if (code != '' && code != null) {
                    console.log(code);
                    data.yadisk.token = code;
                    local_data.set('yadisk_token', code);
                    callback(true);
                }
                else
                    error();
            }
            else{
                error();
            }
        }
        else{
            data.yadisk.token = cookie;
            callback(true);
        }
    }
}

data.get = function(path, callback){
    data.yadisk.request('get', 'resources', {
        path: global.config.root_dir + path
    }, function(msg){
        console.log(msg);
    })
}

data.get_file = function(path, callback){
    data.yadisk.request('get', 'resources/download', {
        path: global.config.root_dir + path
    }, function(msg){
        console.log(111);
        data.yadisk.request('get', msg.href, {
            raw_url: true,
            jsonp: true
        }, function(file){
            console.log(file);
        });
    })
}