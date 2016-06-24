/**
 * run with --src_uglify for run with uglifing src
*/

var gulp = require('gulp'); 
var gulpSequence = require('gulp-sequence');

require('./gulp/build') 
require('./gulp/clean') 
require('./gulp/exec') 
require('./gulp/less') 
require('./gulp/other') 
require('./gulp/swig') 
require('./gulp/uglify') 

gulp.task('default', gulpSequence(
    'dist-clean', // sync
	['uglify', 'css-libs-concat', 'less', 'fa-copy'] // parallel
));

gulp.task('build', gulpSequence(
    ['default', 'cache-app-clean'],
    'build-copy',
	'exec-npm-install', //'exec-bower-install'
    ['build-electron-win'],
    'cache-app-clean'
));


gulp.task('watch', function(){
    gulp.watch('public/styles/less/style.less', ['less-main']);
    gulp.watch('public/js/**/**', ['uglify-src']);
});