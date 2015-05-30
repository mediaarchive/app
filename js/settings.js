function settings_data_type_selector_init() {
    $('#settings_form #root_dir > div').hide();
    $('#settings_form #data_type .btn').click(function(){
        $('#settings_form #root_dir > div').hide();
        $('#settings_form #root_dir #' + $(this).attr('id')).show();
        local_data.set('data_type', $(this).attr('id'));
    });
}

function settings_root_dir_selector_init() {
    $('#file_root_dir_selector').change(function(){
        if ($(this).val() != '') {
            local_data.set('root_dir', $(this).val());
            $('#settings_form #root_dir #dir').text($(this).val());
        }
    })
}

function check_settings(){
    var array = ['data_type', 'root_dir'];
    
    for(var key in array){
        if (array[key] == undefined) 
            return false;
    }
    
    return true;
}

function settings_init(){
    // DATA TYPE //
    
    var data_type = local_data.get('data_type');
    settings_data_type_selector_init();
    
    if (data_type != null) {
        global.data_type = data_type;
        $('#settings_form #data_type #' + data_type).addClass('active');
        $('#settings_form #root_dir #' + data_type).show();
    }
    else
        $('#settings_form #root_dir #nothing').show();
    
    
    // ROOT_DIR //
    
    var root_dir = local_data.get('root_dir');
    settings_root_dir_selector_init();
        
    if (root_dir != null) {
        global.config.root_dir = root_dir;
        $('#settings_form #root_dir #dir').text(root_dir);
    }
        
    $('#start_button').click(function(){
        events_init();
    });
}