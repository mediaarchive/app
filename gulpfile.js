/**
 * run with --src_uglify for run with uglifing src
*/

var gulp = require('gulp'); 
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').exec;
var path = require('path');
var gutil = require('gulp-util');
var cssBase64 = require('gulp-css-base64');
var packager = require('electron-packager');
// var fs = require('fs');
var gulpSequence = require('gulp-sequence');
// var packageJson = require('./package.json');
// var argv = require('optimist').argv;
// var moment = require('moment');

// var phpjs = require('phpjs');
// var date = phpjs.date('d.m.Y H:i:s');

gulp.task('default', function(){
    argv.src_uglify = true;
    return gulpSequence(
        'dist-clean', // sync
		['uglify', 'css-libs-concat', 'less', 'fa-copy', 'swig'] // parallel
	);
});

gulp.task('build', gulpSequence(
    ['default', 'cache-app-clean'],
    'build-copy',
	'exec-npm-install', //'exec-bower-install'
    ['build-electron-win'],
    'cache-app-clean'
));


gulp.task('watch', function(){
    gulp.watch('styles/less/style.less', ['less-main']);
    gulp.watch('js/**/**', ['uglify-src']);
});