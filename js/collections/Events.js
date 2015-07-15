var EventsCollection = Class({
    'extends': MK.Array,
    Model: Event,
    itemRenderer: function(model){
        return render(false, '#eventTemplate', model);
    },
    constructor: function(data) {
        console.log(data);
        var self = this;
        
        this
            .bindNode('sandbox', '.page[data-page=events] table')
            .bindNode('container', ':sandbox tbody')
            .recreate(data);
            
        //events_list_datatable_init();
        //event_modal_init();
        
        this.$(':sandbox').DataTable({
            order: [ 1, 'desc' ],
            language: {
                url: 'js/client_libs/dataTables/Russian.json'
            },
            paging: false,
            searching: false
        });
    }
});