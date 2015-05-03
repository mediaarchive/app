function check_extension(filename, extensions_array){
    filename = filename.toLowerCase();
    
    for(var key in extensions_array){
        //console.log(filename.indexOf('.' + extensions_array[key]), filename, extensions_array[key]);
        if (filename.indexOf('.' + extensions_array[key]) !== -1) 
            return true;
    }
    return false;
}

function event_modal_init() {
    $('#events_table .event_row').click(function(){
        var dir = $(this).data('dir');
        var name = $(this).find('.name').text();
        var date = $(this).find('.date').text();
        var date_tech = $(this).find('.date_tech').text();
        
        data.get('/архив/' + dir, function(files){
            if (files == false) {
                alert('Ошибка при получении файлов мероприятия');
                return false;
            }
            
            var preview_photo = false;
            var text_file = false;
            var photo_dir = false;
            
            for(var key in files){
                if (check_extension(files[key], ['jpg', 'png', 'gif', 'jpeg'])) 
                    preview_photo = files[key];
                    
                if (check_extension(files[key], ['txt', 'doc', 'docx']))
                    text_file = files[key];
                    
                if (files[key].toLowerCase().indexOf('фото') !== -1)
                    photo_dir = true;
            }
            
            var template = Handlebars.compile($('#event_modal_template').html());
            $('#modal .modal-title').text(name);
            $('#modal .modal-body').html(template({
                dir: global.config.root_dir + '/архив/' + dir + '/',
                preview_photo: preview_photo,
                text_file: text_file,
                photo_dir: photo_dir,
                files: files,
                date: date,
                date_tech: date_tech,
                name: name
            }));
            
            if (text_file == false) 
                $('#modal .modal-body #text').text('(нет текста)');
            else
                data.get_file('/архив/' + dir + '/' + text_file, function(text_file_data){
                    if (text_file_data == false) {
                        $('#modal .modal-body #text').text('(не удалось получить текст)');
                        return false;
                    }
                    
                    $('#modal .modal-body #text').text(text_file_data);
                    
                    return true;
                });
            
            $('#modal').modal();
            
            console.log(files, preview_photo, text_file, photo_dir);
            
            return true;
        });
    })
}