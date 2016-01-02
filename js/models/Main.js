/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */
class Main extends MK.Object {
    constructor() {
        super();
        
        data = data.file;
        
        pages._start();
        this.settings = new Settings();
        
        if (this.settings.check()) {
            console.log('settings OK');
            this.events_init();
            
            this.datepicker_init();

            this.show_page('events');
        }
        else{
            $("#pages .page").hide();
            $('#pages [data-page=settings]').show();
        }
    }
    async events_init(){
        console.log('events init')
        $.smkProgressBar({element: 'body', status: 'start'});
        
    
        $.smkAlert({text: 'Получение индекса', type: 'info', time: 1});
        let json = await data.get_file('/index.json');
        
        if (json == false) {
            $.smkAlert({text: 'Не удалось загрузить список мероприятий', type: 'danger', permanent: true});
            $.smkProgressBar({element: 'body', status: 'end'});
        }
        else {
            json = JSON.parse(json);
            if (!json) {
                $.smkAlert({text: 'Ошибка разбора индекса', type: 'danger', permanent: true});
                $.smkProgressBar({element: 'body', status: 'end'});
            }

            global.index = json;
            console.log('before events collection creation')

            $.smkAlert({text:'Запуск', type:'info', time:1});
            
            new EventsCollection(global.index);
            console.log('after events collection creation')

            
            $.smkProgressBar({element: 'body', status: 'end'});
            $('#events_table tbody').liveFilter('#search', 'tr');
        }
        
        return;
    }
    datepicker_init(){
        var datepicker = $('#datepicker_form #datepicker');
    
        datepicker.daterangepicker(
            { 
                format: 'YYYY-MM-DD',
                endDate: new Date(),
                locale: {
                    fromLabel: 'От',
                    toLabel: 'До',
                    cancelLabel: 'Очистить',
                    applyLabel: 'Выбрать'
                }  
            },
            (start, end, label) => {
                alert('A date range was chosen: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
            }
        );
        
        $('#datepicker_form #today').click(() => {
            datepicker.daterangepicker({
                startDate: new Date(),
                endDate: new Date()
            });
        })
    }
    show_page(name) {
        $('.page').hide();
        $('.page[data-page='+name+']').show();
    }
}; 