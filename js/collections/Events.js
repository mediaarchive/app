var EventsCollection = Class({
    'extends': MK.Array,
    Model: Event,
    itemRenderer: function(model){
        return render(false, '#eventTemplate', model);
    },
    constructor: function(data) {
        var self = this;
        
        this
            .bindNode('sandbox', '.page[data-page=events] table')
            .bindNode('container', ':sandbox tbody')
            .recreate(data);

        //var dt = this.$(':sandbox').DataTable();

        if(typeof events_datatable !== 'undefined')
            events_datatable.destroy();

        events_datatable = this.$(':sandbox').DataTable({
            order: [ 1, 'desc' ],
            language: {
                url: 'client_libs/datatables_Russian.json'
            },
            paging: false,
            searching: false
        });
    }
});