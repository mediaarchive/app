function events_init(index){
    $.smkProgressBar({element: 'body', status: 'start'});
    $('.page').hide();
    $('.page[data-page=events]').show();

    async.series([
        function (callback) {
            $.smkAlert({text: 'Получение индекса', type: 'info', time: 1});
            data.get_file('/index.json', function (msg) {
                if (msg == false) {
                    $.smkAlert({text: 'Не удалось загрузить список мероприятий', type: 'danger', permanent: true});
                    $.smkProgressBar({element: 'body', status: 'end'});
                }
                else {
                    json = msg;
                    callback();
                }
            });
        },
        function (callback) {
            console.log(json);

            json = JSON.parse(json);
            if (!json) {
                $.smkAlert({text: 'Ошибка разбора индекса', type: 'danger', permanent: true});
                $.smkProgressBar({element: 'body', status: 'end'});
            }

            global.index = json;

            callback();
        },
        function (callback) {
            $.smkAlert({text:'Запуск', type:'info', time:1});
            datepicker_init();
            new EventsCollection(global.index);

            $.smkProgressBar({element: 'body', status: 'end'});
            $('#events_table tbody').liveFilter('#search', 'tr');

            callback();
        }
    ])
}