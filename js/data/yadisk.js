data.yadisk = {
    request: function(method, url, params, callback){
        method = method.toUpperCase();
        $.ajax({
            method: method,
            url: "https://cloud-api.yandex.net:443/v1/disk/" + url,
            dataType: "jsonp",
            data: params,
            success: function( response ) {
                console.log( response ); // server response
            }
        });
    },
    auth: function(callback){
        
        function error(){
            alert('Нет доступа к Яндекс.Диску - невозможно продолжить работу.');
            callback(false);
        }
        
        var cookie = getcookie('yadisk_token');
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
                    $.ajax({
                        method: "POST",
                        url: "https://oauth.yandex.ru/token",
                        //dataType: "jsonp",
                        data: {
                            grant_type: 'authorization_code',
                            code: code,
                            client_id: global.config.yadisk.id,
                            cliend_secret: global.config.yadisk.pass
                        },
                        success: function( response ) {
                            console.log( response ); // server response
                        }
                    });
                }
                else
                    error();
            }
            else{
                error();
            }
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