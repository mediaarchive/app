if (!site) {
    var async = require('async');
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

function events_list_init() {
    async.series([
        function(callback){
            if (site) {
                data.yadisk.auth(function(status){
                    
                });
            }
            else{
                var root_dir = prompt('Укажите корневую директорию медиаархива');
                
                if (root_dir == null || root_dir == '') {
                    alert('Невозможно продолжить работу');
                    return false;
                }
                
                if(global.config.file == undefined)
                    global.config.file = {};
                
                global.config.file.root_dir = root_dir;
                
                callback();
                return true;
            }
        },
        function (callback) {
            data.get_file('/index.json', function(msg){
                if (msg == false) {
                    alert('Ошибка при открытии файла со списком мероприятий');
                    $('.screen').hide();
                    
                    if (site)
                        window.close();
                    else
                        process.exit();    
                    
                    return false;
                }
                callback();
                return true;
            });
        },
        function (callback) {
            datepicker_init();
            $('.screen').hide();
            $('#main.screen').show();
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