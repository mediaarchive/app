var events_datatable;

class EventsCollection extends MK.Array{
    itemRenderer (model){
        return render(false, '#eventTemplate', model);
    }
    constructor(data) {
        super(data)
        this.Model = Event;
        
        this
            .bindNode('sandbox', '.page[data-page=events] #events_content')
            .bindNode('container', ':sandbox')
            .recreate(data);
            
        console.log('events collection: after recreate');
        
        $('#events_content').liveFilter('#search', 'tr');
        this.sort();
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
};