var gulp = require('gulp');
var less = require('gulp-less');
var exec = require('gulp-exec');
var clean = require('gulp-clean');
var nano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var concat = require('gulp-concat');
var builder = require('gulp-nw-builder');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var phpjs = require('phpjs');
var date = phpjs.date('d.m.Y H:i:s');

gulp.task('dist-clean', function(cb){
    return gulp.src('dist/', {read: false}).pipe(clean())
})

gulp.task('less-main', function() {
    return gulp.src('styles/less/style.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(nano())
        .pipe(sourcemaps.write('./'))
        .pipe(rename('src.min.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('less', ['less-main']);

var bc = 'bower_components/';

gulp.task('css-libs-concat', function(){
    return gulp.src([
        bc + 'bootstrap/dist/css/bootstrap.min.css',
        bc + 'datatables-bootstrap3-plugin/media/css/datatables-bootstrap3.min.css',
        bc + 'smoke/dist/css/smoke.min.css',
        bc + 'bootstrap-daterangepicker/daterangepicker-bs3.min.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('libs.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(header('/*! MediaArchiveApp libs css (build '+date+') ma.atnartur.ru */' + "\r\n"))
        .pipe(gulp.dest('dist/'));
});

gulp.task('uglify-libs', function(){
    return gulp.src([
        bc + 'jquery/dist/jquery.min.js',
        bc + 'bootstrap/dist/js/bootstrap.min.js',
        bc + 'moment/min/moment.min.js',
        bc + 'handlebars/handlebars.min.js',
        bc + 'datatables/media/js/jquery.dataTables.min.js',
        bc + 'smoke/dist/js/smoke.min.js',
        bc + 'matreshka/matreshka.min.js',
        bc + 'bootstrap-daterangepicker/daterangepicker.min.js',
        bc + 'datatables-bootstrap3-plugin/media/js/datatables-bootstrap3.min.js',
        bc + 'jquery.livefilter/jquery.liveFilter.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('libs.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(header('/*! MediaArchiveApp libs (build '+date+') ma.atnartur.ru */' + "\r\n"))
        .pipe(gulp.dest('dist/'));
});

gulp.task('uglify-src', function(){
    return gulp.src([
        'js/general.js',
        'js/base.js',
        'js/local_data.js',
        'js/pages.js',
        'js/events_init.js',
        'js/index_update.js',
        'js/vk.js',
        'js/settings.js',
        'js/view.js',
        'js/data/base.js',
        'js/data/file.js',
        
        'js/models/Event.js',
        'js/collections/Events.js',
        
        'js/run.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('src.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(header('/*! MediaArchiveApp src (build '+date+') ma.atnartur.ru */' + "\r\n"))
        .pipe(gulp.dest('dist/'));
});


gulp.task('uglify', ['uglify-libs', 'uglify-src']);

gulp.task('exec-npm-install', function() {
    gulp.src('./cache/app')
        .pipe(exec('npm install --production', {
            continueOnError: false, // default = false, true means don't emit error event 
            pipeStdout: false, // default = false, true means stdout is written to file.contents 
        }))
        .pipe(exec.reporter({
            err: true, // default = true, false means don't write err 
            stderr: true, // default = true, false means don't write stderr 
            stdout: true // default = true, false means don't write stdout 
        }));
});

gulp.task('exec-bower-install', function() {
    gulp.src('./cache/app')
        .pipe(exec('bower install', {
            continueOnError: false, // default = false, true means don't emit error event 
            pipeStdout: false, // default = false, true means stdout is written to file.contents 
        }))
        .pipe(exec.reporter({
            err: true, // default = true, false means don't write err 
            stderr: true, // default = true, false means don't write stderr 
            stdout: true // default = true, false means don't write stdout 
        }));
});

gulp.task('build-exe', function() {
    return gulp.src(['./cache/app/**/*'])
        .pipe(builder({
            version: 'v0.12.2',
            platforms: ['win']
        }));
});

gulp.task('build-copy', function(){
    return gulp.src([
        './**/*',
        '!./builds/**/*',
        '!./builds',
        '!./cache/**/*',
        '!./cache',
        '!./styles/**/*',
        '!./styles',
        '!./js/**/*',
        '!./js',
        '!./node_modules/**/*',
        '!./node_modules',
        '!./bower_components/**/*',
        '!./bower_components',
        '!./.gitignore',
        '!./*.log',
        '!./*.komodoproject',
        '!./config_sample.json',
        '!./start.bat',
        '!./gruntfile.js',
        '!./gulpfile.js',
    ])
        .pipe(gulp.dest('./cache/app/'));
});

gulp.task('cache-app-clean', function(){
    return gulp.src('cache/app/', {read: false}).pipe(clean())
});

gulp.task('default', function(){
    return runSequence(
        'dist-clean', // sync
		['uglify', 'css-libs-concat', 'less'] // parallel
	);
});

gulp.task('build', function(){
    return runSequence(
        'dist-clean', // sync
		['uglify', 'css-libs-concat', 'less'], // parallel
        'build-copy',
		['exec-npm-install', 'exec-bower-install'],
        'build-exe',
        'cache-app-clean'
	);
});


gulp.task('watch', function(){
    gulp.watch('styles/less/style.less', ['less-main']);
    gulp.watch('js/**/**', ['uglify-src']);
});