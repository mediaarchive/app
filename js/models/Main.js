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
        var self = this;
        
        if (this.settings.check()) {
            $.smkProgressBar({element: 'body', status: 'start'});

            console.log('settings OK');
            
            setTimeout(function(){
                self.events_init();
            }, 1000)
            
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
        console.log(1)
    
        $.smkAlert({text: 'Получение индекса', type: 'info', time: 1});
        let json = await data.get_file('/index.json');
        console.log(2)
        
        if (json == false) {
            $.smkAlert({text: 'Не удалось загрузить список мероприятий', type: 'danger', permanent: true});
            $.smkProgressBar({element: 'body', status: 'end'});
        }
        else {
            console.log(3)
            json = JSON.parse(json);
            if (!json) {
                $.smkAlert({text: 'Ошибка разбора индекса', type: 'danger', permanent: true});
                $.smkProgressBar({element: 'body', status: 'end'});
            }

            global.index = json;
            console.log('before events collection creation')

            $.smkAlert({text:'Запуск', type:'info', time:1});
            
            this.events = new EventsCollection(global.index);
            console.log('after events collection creation')
            
            $.smkProgressBar({element: 'body', status: 'end'});
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