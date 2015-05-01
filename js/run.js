if (!site) {
    var async = require('async');
    var exec = require('exec');
}

function datepicker_init() {
    var datepicker = $('#datepicker_form #datepicker');
    
    datepicker.daterangepicker({ 
        format: 'YYYY-MM-DD',
        endDate: new Date(),
        locale: {
            fromLabel: 'От',
            toLabel: 'До',
            cancelLabel: 'Очистить',
            applyLabel: 'Выбрать'
        }  
    },
    function(start, end, label) {
        alert('A date range was chosen: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
    
    $('#datepicker_form #today').click(function(){
        datepicker.daterangepicker({
            startDate: new Date(),
            endDate: new Date()
        });
    })
}

function render_events_list(events){
    
}

function events_list_init() {
    var json;
    function error() {
        $('.screen').hide();
            
        if (site)
            window.close();
        else
            process.exit();  
    }
    
    async.series([
        function(callback){
            $('#loading #str').text('Подготовка');
            if (site) {
                data.yadisk.auth(function(status){
                    
                });
            }
            else{
                var root_dir = local_data.get('root_dir');
                
                if (root_dir != '' && root_dir != null && root_dir != undefined) {
                    global.config.file.root_dir = root_dir;
                    callback();
                    return true;
                }
                
                var root_dir = prompt('Укажите корневую директорию медиаархива');
                
                if (root_dir == null || root_dir == '') {
                    alert('Невозможно продолжить работу');
                    error();
                    return false;
                }
                
                if(global.config.file == undefined)
                    global.config.file = {};
                
                global.config.file.root_dir = root_dir;
                local_data.set('root_dir', root_dir);
                
                callback();
                return true;
            }
        },
        function (callback) {
            function get_file() {
                $('#loading #str').text('Получение индекса...');
                
                data.get_file('/index.json', function(msg){
                    if (msg == false) {
                        alert('Ошибка при открытии файла со списком мероприятий');
                        error();   
                    }
                    else{
                       json = msg;
                       callback();
                    }
                });
            }
            
            get_file();
        },
        function (callback) {
            json = JSON.parse(json);
            if (!json) {
                alert('Ошибка разбора файла со списком мероприятий');
                error();
            }
            
            global.index = json;
            
            callback();
            return true;
        },
        function (callback) {
            datepicker_init();
            $('.screen').hide();
            $('#main.screen').show();
            render_events_list(global.index);
            callback();
        }
    ])
}

$(document).ready(function(){
    $.get('js/config.json', function(msg){
        global.config = JSON.parse(msg);
        events_list_init();
    })
});