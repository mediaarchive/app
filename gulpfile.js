var gulp = require('gulp');
var less = require('gulp-less');
var nano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
//var handlebars = require('gulp-handlebars');
//var wrap = require('gulp-wrap');
//var declare = require('gulp-declare');
var concat = require('gulp-concat');
//var apidoc = require('gulp-apidoc');
//var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');
//var livereload = require('gulp-livereload');

var phpjs = require('phpjs');
var date = phpjs.date('d.m.Y H:i:s');

gulp.task('less-main', function() {
    return gulp.src('styles/less/style.less')
        .pipe(less())
        .pipe(nano())
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

gulp.task('default', ['uglify', 'css-libs-concat', 'less']);

gulp.task('watch', function(){
    livereload.listen();
    
    function cb() {
        livereload.reload();
    }
    
    gulp.watch('public/styles/admin/less/*', ['less-admin', cb]);
    gulp.watch('public/styles/site/less/*', ['less-site', cb]);
    
    gulp.watch([
        'public/js/admin/tests/edit/**/**',
        'public/js/common/handlebars_helpers.js',
        '!public/js/admin/tests/edit/all.min.js'
    ], ['uglify-admin_test_editor', cb]);
    
    gulp.watch([
        'public/js/external/tests/main.js'
    ], ['uglify-test_viewer', cb]);
    
    gulp.watch([
        'public/styles/external/tests/*',
        '!public/styles/external/tests/*.min.css'
    ], ['less-test_viewer', cb]);
    
    gulp.watch('public/js/external/tests/templates/src/**/**.html', ['handlebars-test_viewer', cb]);
    
    gulp.watch([
        'public/js/admin/presenter/app/src/models/**.js',
        'public/js/admin/presenter/app/src/**.js'
    ], ['uglify-presenter', cb]);
})