function events_init(){
    $.smkProgressBar({element: 'body', status: 'start'});
    $('.page').hide();
    $('.page[data-page=events]').show();

    async.series([
        function (callback) {
            $.smkAlert({text:'��������� �������', type:'info', time:1});
            data.get_file('/index.json', function(msg){
                if (msg == false) {
                    $.smkAlert({text:'�� ������� ��������� ������ �����������', type:'danger', permanent:true});
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
                $.smkAlert({text:'������ ������� �������', type:'danger', permanent:true});
                $.smkProgressBar({element: 'body', status: 'end'});
            }

            global.index = json;

            callback();
            return true;
        },
        function (callback) {
            $.smkAlert({text:'��������� ��������', type:'info', time:1});
            $.get('client_templates.html', function(data){
                $('body').append(data);
                callback();
            });
        },
        function (callback) {
            $.smkAlert({text:'������', type:'info', time:1});
            datepicker_init();
            new EventsCollection(global.index);

            $.smkProgressBar({element: 'body', status: 'end'});

            callback();
        }
    ])
}