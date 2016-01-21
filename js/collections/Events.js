var events_datatable;

class EventsCollection extends MK.Array{
    itemRenderer (model){
        return render(false, '#eventTemplate', model);
    }
    constructor(data) {
        super(data)
        this.Model = Event;
        
        $('#events_content').html('');
        
        this
            .bindNode('sandbox', '.page[data-page=events] #events_content')
            .bindNode('container', ':sandbox')
            .recreate(data);
            
        console.log('events collection: after recreate');
        
        this.sort();
        this.update_labels();
        this.search();
    }
    sort(){
        console.log('sorting');
        var items = $('#events_content li').get();
        items.sort(function(a,b){
            var a = $(a).data('date');
            var b = $(b).data('date');
          
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        });
        var ul = $('#events_content');
        $.each(items, function(i, li){
            ul.append(li);
        });
    }
    update_labels(){
        var labels = {};
        $('#events_content .event').each(function(){
            var label = $(this).data('date-label');
            
            if (typeof labels[label] === 'undefined') 
                labels[label] = true;
        });
        
        for (var key in labels) {
            var month = key.substr(4);
            var year = key.substr(0, 4);
            
            month = month
                .replace('01', 'январь')
                .replace('02', 'февраль')
                .replace('03', 'март')
                .replace('04', 'апрель')
                .replace('05', 'май')
                .replace('06', 'июнь')
                .replace('07', 'июль')
                .replace('08', 'август')
                .replace('09', 'сентябрь')
                .replace('10', 'октябрь')
                .replace('11', 'ноябрь')
                .replace('12', 'декабрь')
            
            $('#events_content .event[data-date-label='+key+']:eq(0)').before('<li class="time-label">'+
                  '<span class="bg-red">' + month + ' ' + year + '</span>'+
            '</li>')
        }
    }
    search(){
        $('#events_content').liveFilter('#search', 'li:not(.time-label)', {
            filterChildSelector: 'h3'
        });
        $('#search').keyup(function(){
            var $elem = $(this);
            if ($elem.val() == '') 
                $('#events_content .time-label').show();
            else
                $('#events_content .time-label').hide();
        });
    }
    create(year, month, day, name){
        
        var date = moment();
        self.events.push({
            date: {
                year: year,
                month: month,
                day: day
            },
            dir: year + '/' + month + '/' + day + '/' + name
        });
        self.events[self.events.length - 1].show_modal();
    }
};