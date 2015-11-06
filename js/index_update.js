/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */

var indexer = require('SchoolMediaIndex');

function index_update(){
    var index = indexer.dirs.start(global.config.root_dir + '/архив/');
    indexer.render.json_generate(global.config.root_dir + '/index.json', index);
    events_init();
}