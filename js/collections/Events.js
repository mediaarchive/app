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
            //.bindNode('sandbox', '.page[data-page=events] table')
            //.bindNode('container', ':sandbox tbody')
            .recreate(data);
        console.log('events collection: after recreate');
        
        $('#events_content').liveFilter('#search', 'tr');

        //var dt = this.$(':sandbox').DataTable();

        //if(typeof events_datatable !== 'undefined')
        //    events_datatable.destroy();
        //
        //events_datatable = this.$(':sandbox').DataTable({
        //    order: [ 1, 'desc' ],
        //    language: {
        //        url: 'client_libs/datatables_Russian.json'
        //    },
        //    paging: false,
        //    searching: false
        //});
    }
};