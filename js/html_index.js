/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

var fs = require('fs');
var os = require('os');
var config = require('./config');
var shell = require('electron').shell;

function html_index(index, callback){
	var date = moment().format('HH.mm.ss DD.MM.YYYY');

	var assets = '<style>';

	[
		"libs/bootstrap/dist/css/bootstrap.min.css",
        "libs/AdminLTE/dist/css/AdminLTE.min.css",
        "libs/AdminLTE/dist/css/skins/skin-blue.min.css"
	].forEach((elem) => {
		assets += fs.readFileSync(elem).toString();
	});

	assets += '</style>';
	assets += '<link rel="stylesheet" href="http://static.clienddev.ru/font-awesome/4.3.0/font-awesome.min.css" />'

	var template = fs.readFileSync('./templates/html_index.html').toString();

	template = Handlebars.compile(template);
	
	var path = os.homedir() + '/Медиаархив-выгрузка.html';

	fs.writeFileSync(path, template({
		assets: assets,
		date: date,
		index: global.index,
		count: global.index.length,
		public_root_url: config.api.yandex.public_url
	}));

	shell.showItemInFolder(path);

	if(typeof callback !== 'undefined')
		callback();
}