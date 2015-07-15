var EventsCollection = Class({
    'extends': MK.Array,
    Model: EventModel,
    itemRenderer: function(model){
        console.log(model)
        return render(false, '#eventTemplate', model);
    },
    constructor: function(data) {
        console.log(data);
        var self = this;
        
        this
            .bindNode('sandbox', '.page[data-page=events] table')
            .bindNode('container', ':sandbox tbody')
            .recreate(data);
        console.log(this.$(':sandbox'));
        //this.$(':sandbox').DataTable({
        //    order: [ 1, 'desc' ],
        //    language: {
        //        //url: 'js/client_libs/dataTables/Russian.json'
        //    },
        //    paging: false,
        //    searching: false
        //});
    }
});