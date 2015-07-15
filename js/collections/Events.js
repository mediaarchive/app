var EventsCollection = Class({
    'extends': MK.Array,
    Model: EventModel,
    itemRenderer: function(model){
        return render(false, '#eventTemplate', model);
    },
    constructor: function(data) {
        var self = this;
        
        this
            .bindNode('sandbox', '.page[data-page=events] table')
            .bindNode('container', ':sandbox tbody')
            .recreate(data);
        
        this.$(':sandbox').DataTable({
            order: [ 1, 'desc' ],
            language: {
                url: 'js/client_libs/dataTables_Russian.json'
            },
            paging: false,
            searching: false
        });
    }
});