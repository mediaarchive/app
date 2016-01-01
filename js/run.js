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

var main;

$(document).ready(function(){
    win.showDevTools();
        
    global.config = {}
    
    main = new Main();
    
    var json;
    function error() {
        $('.screen').hide();
            
        if (site)
            window.close();
        else
            process.exit();  
    }
    
    if(check_settings())
        events_init();
    else{
        $("#pages .page").hide();
        $('#pages [data-page=settings]').show();
    }

    $('#update_index_button').click(function(){
        index_update();
    })
});