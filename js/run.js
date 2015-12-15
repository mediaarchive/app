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
    
    if(check_settings())
        events_init();
    else{
        $("#pages .page").hide();
        $('#pages [data-page=settings]').show();
    }
}

$(document).ready(function(){
    //var ver_stable = true;
    //if (typeof ver_stable == 'undefined') // если не стабильная
    //    win.showDevTools();

    $.getJSON('js/config.json', function(msg){
        global.config = msg;
        main_init();
    });

    $('#update_index_button').click(function(){
        index_update();
    })
});