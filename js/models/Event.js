var path = require('path');
var restler = require('restler');
var async = require('async');
var shell = require('electron').remote.shell;

class Event extends MK.Object{
	constructor(data, collection) {
		super()
		this.jset(data);
		
		var self = this;
		
		this.on('render', () => {
			var self = this;
			
			this.bindNode('name', ':sandbox .name', {
				setValue: (v) => {
					this.innerHTML = v;
				}
			});
			this.bindNode('dir', ':sandbox', {
				setValue: (v) => {
					self.$(this).data('dir', v);
				}
			});
			// console.log(this.$sandbox);
			this.$sandbox.click(() => {
				console.log('click');
				self.show_modal();
			})
			
			//this.$('.open_folder').click(() => {
			//    gui.Shell.openItem(path.normalize(global.main.settings.root_dir + '/архив/' + self.dir));
			//});
		});
	}
	async show_modal(){
		console.log('show modal');
		$.smkProgressBar({element: 'body', status: 'end'});
		var self = this;
		
		var date = this.date.day + '.' + this.date.month + '.' + this.date.year;
		var date_tech =  this.date.year + '-' + this.date.month + '-' + this.date.day;
		
		console.log('get files');

		let files = await data.get('/архив/' + this.dir);

		if (files == false) {
			alert('Ошибка при получении файлов мероприятия');
			return false;
		}
		
		var preview_photo = null;
		var text_file = null;
		var photo_dir = null;

		console.log('searching for standart files');
		
		for(var key in files){
			if (check_extension(files[key], ['jpg', 'png', 'gif', 'jpeg'])) 
				preview_photo = files[key];
				
			if (check_extension(files[key], ['txt', 'doc', 'docx']))
				text_file = files[key];
				
			if (files[key].toLowerCase().indexOf('фото') !== -1)
				photo_dir = true;
		}

		console.log('template compile');
		
		var template = Handlebars.compile($('#event_modal_template').html());

		console.log('render');
console.log(template({
			dir: global.main.settings.root_dir + '/архив/' + self.dir + '/',
			preview_photo: preview_photo,
			text_file: text_file,
			photo_dir: photo_dir,
			files: files,
			date: date,
			date_tech: date_tech,
			name: self.name
		}), $('#modal .modal-title'))
		$('#modal .modal-title').text(self.name);
		$('#modal .modal-body').html(template({
			dir: global.main.settings.root_dir + '/архив/' + self.dir + '/',
			preview_photo: preview_photo,
			text_file: text_file,
			photo_dir: photo_dir,
			files: files,
			date: date,
			date_tech: date_tech,
			name: self.name
		}));

		var $modal = $('#modal .modal-body');
		
		console.log('handlers init');

		$modal.find('.open_dir').click(function(){
			shell.openItem(path.normalize(global.main.settings.root_dir + '/архив/' + self.dir));
		});

		// @TODO: формирование шаблона текста
		// @TODO: предпросмотр текста перед публикацией

		console.log('img handler');

		$modal.find('img').click(function(){
			shell.openItem(path.normalize(global.main.settings.root_dir + '/архив/' + self.dir + '/' + preview_photo));
		});

		console.log('text');
		
		let text_file_data;

		if (text_file == null) 
			$modal.find('#text').text('(нет текста)');
		else{
			text_file_data = await data.get_file('/архив/' + self.dir + '/' + text_file);
				
			if (text_file_data == false) 
				$modal.find('#text').text('(не удалось получить текст)');
			else
				 $('#modal .modal-body #text').text(text_file_data);
		}

		var data_json;
		let data_file_data = await data.get_file('/архив/' + self.dir + '/data.json');
		
		console.log(data_file_data);

		if (data_file_data == false) 
			$modal.find('#event_authors').text('(нет информации)');
		else{
			data_json = JSON.parse(data_file_data.toString());
			if (!data_json) {
				alert('Не удалось разобрать данные');
			}
			else{
				var author_template = Handlebars.compile($('#event_author_template').html());
				data_json.authors.forEach(function(author){
					$('#event_authors').append(author_template({
						name: author.name,
						email: author.address,
						vk: author.vk
					}));
				});
			}
		}

		$('#modal .modal-body .vk_post').click(function(){
			var $button = $(this);
			$button.attr('disabled', 'disabled');
			$button.text('Отправка...');
			// публикуем пост

			var photo_obj;

			async.series([
				(callback) => {
					console.log(preview_photo)
					if (typeof preview_photo !== 'undefined' && preview_photo != null && preview_photo != false) {
						$button.text('Подготовка к загрузке фото...');

						vk.get('photos.getWallUploadServer', {
							group_id: global.config.api.vk.group_id,
							access_token: global.main.settings.vk.access_token
						}, (res) => {
							if(typeof res.error !== 'undefined'){
								alert('Не получилось загрузить фотографию');
								return;
							}

							console.log(res);

							$button.text('Загрузка фото...');

							var photo_path = global.main.settings.root_dir + '/архив/' + self.dir + '/' + preview_photo;

							// @TODO: вынести функцию загрузки фото в vk.js
							restler.post(res.response.upload_url, {
								multipart:true,
								data: {
									// @TODO: определение формата фотографии и замена MIME-type
									photo: restler.file(photo_path, null, fs.statSync(photo_path).size, null, 'image/jpg')
								}
							}).on('complete', (res) => {
								res = JSON.parse(res);
								console.log(res);

								$button.text('Прикрепление фото...');

								var photo_arr = JSON.parse(res.photo);
								console.log(photo_arr, photo_arr[0]);

								vk.get('photos.saveWallPhoto', {
									access_token: global.main.settings.vk.access_token,
									group_id: config.api.vk.group_id,
									photo: res.photo, //JSON.stringify(photo_arr[0]),
									server: res.server,
									hash: res.hash
								}, (res) => {
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
				(callback) => {
					$button.text('Размещение записи...');

					var attachments = '';

					if(typeof photo_obj !== 'undefined')
						attachments = photo_obj.id;

					var post_text = self.name + "\n" +
							"#news@school42_kazan\n\n" +
							text_file_data;                      
					
					if (typeof data_json !== 'undefined' && typeof data_json.authors !== 'undefined') {
						post_text += "\n\n";
						let names = []
						data_json.authors.forEach(function(author){
							names.push(author.name);
						});
						post_text += 'Авторы: ' + names.join(', ');
					}
						
					vk.post('wall.post', {
						access_token: global.main.settings.vk.access_token,
						owner_id: Number(config.api.vk.group_id) * -1, // id группы
						from_group: 1, // от имени группы
						attachments: attachments,
						message: post_text
					}, (res) => {
						console.log(res);

						$button.html('<i class="fa fa-vk"></i> <i class="fa fa-check"></i> Опубликовано');

						if(confirm('Пост опубликован. Открыть его?'))
							shell.openItem('http://vk.com/wall-' + config.api.vk.group_id + '_' + res.response.post_id);

						callback();
					});
				}
			]);

			return true;
		});
		
		$('#modal').modal('show');
	}
};