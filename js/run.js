var async = require('async');
var exec = require('exec');

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

function events_init(){
    $.smkProgressBar({element: 'body', status: 'start'});
    $('.page').hide();
    $('.page[data-page=events]').show();
    
    async.series([
        function (callback) {    
            $.smkAlert({text:'Получение индекса', type:'info', time:1});
            data.get_file('/index.json', function(msg){
                if (msg == false) {
                    $.smkAlert({text:'Не удалось загрузить список мероприятий', type:'danger', permanent:true});
                    $.smkProgressBar({element: 'body', status: 'end'});
                }
                else{
                   json = msg;
                   callback();
                }
            });
        },
        function (callback) {
            console.log(json);
            
            json = JSON.parse(json);
            if (!json) {
                $.smkAlert({text:'Ошибка разбора индекса', type:'danger', permanent:true});
                $.smkProgressBar({element: 'body', status: 'end'});
            }
            
            global.index = json;
            
            callback();
            return true;
        },
        function (callback) {
            $.smkAlert({text:'Получение шаблонов', type:'info', time:1});
            $.get('client_templates.html', function(data){
                $('body').append(data);
                callback();
            });
        },
        function (callback) {
            $.smkAlert({text:'Запуск', type:'info', time:1});
            datepicker_init();
            new EventsCollection(global.index);
            
            $.smkProgressBar({element: 'body', status: 'end'});
            
            callback();
        }
    ])
}

function main_init() {
    var json;
    function error() {
        $('.screen').hide();
            
        if (site)
            window.close();
        else
            process.exit();  
    }
    
    pages._start();
    btn_selector_init();
    settings_init();
    
    if(check_settings()){
        events_init();
    }
    else{
        $("#pages .page").hide();
        $('#pages [data-page=settings]').show();
    }
}

$(document).ready(function(){
    $.getJSON('js/config.json', function(msg){
        global.config = msg;
        main_init();
    })
});