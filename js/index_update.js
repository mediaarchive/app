/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */

var indexer = require('SchoolMediaIndex');
var path = require('path');

function index_update(){
    var index = indexer.dirs.start(global.config.root_dir + '/архив/');
    console.log(index);
    indexer.render.json_generate(path.normalize(global.config.root_dir + '/index.json'), index);
    events_init();
}