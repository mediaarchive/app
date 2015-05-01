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
    if (site) {
        data_yadisk.auth(function(status){
            data.get('/index.json', function(msg){
                
            });
        });
        
    }
    
}

var config;

$(document).ready(function(){
    datepicker_init();

    $.get('js/config.json', function(msg){
        config = msg;
        events_list_init();
    })
});