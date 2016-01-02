/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */
class Settings extends MK.Object {
    constructor() {
        super()
        this.data_type = this.root_dir = this.vk = '' ;
        
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
        
        this.bindNode('vk', '#settings #vk_button', {
            setValue: (v) => {
                var $elem = $('#settings #vk_button');
                
                if(typeof v === 'undefined' || v == '') 
                    $elem.removeAttr('disabled')
                else{
                    $elem.text('Загрузка...').attr('disabled', 'disabled');
                    vk.get('users.get', {user_ids: v.user_id}, function(res){
                        $elem.text('Авторизованы как ' + res.response[0].first_name + ' ' + res.response[0].last_name);
                    });
                }
            }
        });
        
        this.data_type = local_data.get('data_type');
        this.root_dir = local_data.get('root_dir');
        this.vk = local_data.get('vk');
        
        this.on('change', (a,b) => {
            ['data_type', 'root_dir', 'vk'].forEach((val) => {
                local_data.set(val, this[val]);
            });
        })
                    
        $('#start_button').click(function(){
            main.events_init();
        });
    
        $("#vk_button").click(function () {
            $(this).attr('disabled', 'disabled').text('Авторизация...');
            vk.start_auth();
        });
    }
    check(){
        console.log(111, this.root_dir, this.data_type)
        return typeof this.root_dir !== 'undefined' && this.root_dir.length != 0 && this.data_type != '' && this.root_dir != '';
    }
}