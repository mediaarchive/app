/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */
class Settings extends MK.Object {
    constructor() {
        super()
        this.data_type = this.root_dir = '';
        
        this.bindNode('data_type', '#settings #data_type', {
            setValue: function( v ) {            
                $(this).val(v)
            }
        });
        
        this.on('change:data_type', function(){
            var data_type = 'nothing';
            
            if (this.data_type != '') 
                data_type = this.data_type;
                
            $('#settings_form #root_dir div').hide();
            $('#settings_form #root_dir #' + data_type).show();
        });
        
        this.bindNode('root_dir', '#settings #root_dir', {
            setValue: (v) => {            
                $('#settings_form #root_dir #dir').text(v);
            }
        });
        
        this.data_type = local_data.get('data_type');
        this.root_dir = local_data.get('root_dir');
        
        this.on('change', (a,b) => {
            ['data_type', 'root_dir'].forEach((val) => {
                local_data.set(val, this[val]);
            });
        })
                    
        $('#start_button').click(function(){
            events_init();
        });
    
        vk.init();
    }
    check(){
        console.log('check', typeof this.root_dir !== 'undefined' && this.root_dir.length != 0 && this.data_type != '' && this.root_dir != '', this.root_dir )
        return typeof this.root_dir !== 'undefined' && this.root_dir.length != 0 && this.data_type != '' && this.root_dir != '';
    }
}