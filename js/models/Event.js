var path = require('path');
var VK = require('vksdk');
var restler = require('restler');

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

var EventModel = Class({
    'extends': MK.Object,
    constructor: function(data, collection) {
        this.jset(data);
        
        var self = this;
        
        this.on('render', function() {
            var self = this;
            
            this.bindNode('name', ':sandbox .name', {
                setValue: function( v ) {
                    this.innerHTML = v;
                }
            });
            this.bindNode('dir', ':sandbox', {
                setValue: function(v) {
                    self.$(this).data('dir', v);
                }
            });
            this.$('.show_modal').click(function(){
                self.show_modal();
            })
            
            this.$('.open_folder').click(function(){
                gui.Shell.openItem(path.normalize(global.config.root_dir + '/архив/' + self.dir));
            });
        });
    },
    show_modal: function(){
        $.smkProgressBar({element: 'body', status: 'end'});
        var self = this;
        
        var date = this.date.day + '.' + this.date.month + '.' + this.date.year;
        var date_tech =  this.date.year + '-' + this.date.month + '-' + this.date.day;
        
        data.get('/архив/' + this.dir, function(files){
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
            $('#modal .modal-title').text(self.name);
            $('#modal .modal-body').html(template({
                dir: global.config.root_dir + '/архив/' + self.dir + '/',
                preview_photo: preview_photo,
                text_file: text_file,
                photo_dir: photo_dir,
                files: files,
                date: date,
                date_tech: date_tech,
                name: self.name
            }));
            
            if (text_file == false) 
                $('#modal .modal-body #text').text('(нет текста)');
            else
                data.get_file('/архив/' + self.dir + '/' + text_file, function(text_file_data){
                    if (text_file_data == false) {
                        $('#modal .modal-body #text').text('(не удалось получить текст)');
                        return false;
                    }
                    
                    $('#modal .modal-body #text').text(text_file_data);

                    $('#modal .modal-body .open_dir').click(function(){
                        gui.Shell.openItem(path.normalize(global.config.root_dir + '/архив/' + self.dir));
                    });

                    // @TODO: формирование шаблона текста
                    // @TODO: предпросмотр текста перед публикацией
                    // @TODO: загрузка фото

                    $('#modal .modal-body .vk_post').click(function(){
                        $button = $(this);
                        $button.attr('disabled', 'disabled');
                        $button.text('Отправка...');
                        // публикуем пост

                        var photo_obj;

                        async.series([
                            function(callback) {
                                if (typeof preview_photo !== 'undefined') {
                                    $button.text('Подготовка к загрузке фото...');

                                    vk.get('photos.getWallUploadServer', {
                                        group_id: config.api.vk.group_id,
                                        access_token: vk.settings.access_token
                                    }, function (res) {
                                        if(typeof res.error !== 'undefined'){
                                            alert('Не получилось загрузить фотографию');
                                            return;
                                        }

                                        console.log(res);

                                        $button.text('Загрузка фото...');

                                        var photo_path = global.config.root_dir + '/архив/' + self.dir + '/' + preview_photo;

                                        // @TODO: вынести функцию загрузки фото в vk.js
                                        restler.post(res.response.upload_url, {
                                            multipart:true,
                                            data: {
                                                // @TODO: определение формата фотографии и замена MIME-type
                                                photo: restler.file(photo_path, null, fs.statSync(photo_path).size, null, 'image/jpg')
                                            }
                                        }).on('complete', function(res){
                                            res = JSON.parse(res);
                                            console.log(res);

                                            $button.text('Прикрепление фото...');

                                            var photo_arr = JSON.parse(res.photo);
                                            console.log(photo_arr, photo_arr[0]);

                                            vk.get('photos.saveWallPhoto', {
                                                access_token: vk.settings.access_token,
                                                group_id: config.api.vk.group_id,
                                                photo: res.photo, //JSON.stringify(photo_arr[0]),
                                                server: res.server,
                                                hash: res.hash
                                            }, function(res){
                                                if(typeof res.error !== 'undefined'){
                                                    alert('Не удалось прикрепить фотографию. Запись будет размещена без фотографии');
                                                    console.error(res.error);
                                                }
                                                console.log(res);
                                                photo_obj = res.response[0];
                                                callback();
                                            });
                                        });
                                    });
                                }
                                else
                                    callback();
                            },
                            function(callback){
                                $button.text('Размещение записи...');

                                var attachments = '';

                                if(typeof photo_obj !== 'undefined')
                                    attachments = photo_obj.id

                                vk.post('wall.post', {
                                    access_token: vk.settings.access_token,
                                    owner_id: Number(config.api.vk.group_id) * -1, // id группы
                                    from_group: 1, // от имени группы
                                    attachments: attachments,
                                    message:
                                        self.name + "\n" +
                                        "#news@school42_kazan\n\n" +
                                        text_file_data
                                }, function(res){
                                    console.log(res);

                                    $button.html('<i class="fa fa-vk"></i> <i class="fa fa-check"></i> Опубликовано');

                                    if(confirm('Пост опубликован. Открыть его?'))
                                        gui.Shell.openItem('http://vk.com/wall-' + config.api.vk.group_id + '_' + res.response.post_id);

                                    callback();
                                })
                            }
                        ]);
                    });

                    return true;
                });
            
            $('#modal').modal();
            
            return true;
        });
    }
});