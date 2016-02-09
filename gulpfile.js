/**
 * run with --src_uglify for run with uglifing src
*/

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
var exec = require('child_process').exec;
var path = require('path');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var cssBase64 = require('gulp-css-base64');
var replace = require('gulp-replace');
var electron = require('gulp-electron');
var swig = require('gulp-swig');
var fs = require('fs');
var packageJson = require('./package.json');
var argv = require('optimist').argv;

var phpjs = require('phpjs');
var date = phpjs.date('d.m.Y H:i:s');

gulp.task('dist-clean', function(cb){
    return gulp.src('dist/', {read: false}).pipe(clean())
})

gulp.task('less-main', function() {
    return gulp.src('styles/less/style.less')
        .pipe(less())
        .pipe(nano())
        .pipe(rename('src.min.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('less', ['less-main']);

var bc = './bower_components/';

gulp.task('fa-copy', function(){
    return gulp.src(bc + 'font-awesome/fonts/**')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('css-libs-concat', function(){
        return gulp.src(packageJson.assets.css.external)
        .pipe(cssBase64({
            baseDir: "./",
            //maxWeightResource: 100,
            extensionsAllowed: [
                '.gif', '.jpg', '.png',
                '.eot', '.svg', '.ttf', '.woff', '.woff2', '.otf',
                //'.ttf?v=4.3.0', '.woff?v=4.3.0', '.woff2?v=4.3.0',
            ]
        }))
        .pipe(concat('libs.min.css'))
        .pipe(replace('../', './'))
        .pipe(header('/*! MediaArchiveApp libs css (build '+date+') ma.atnartur.ru */' + "\r\n"))
        .pipe(gulp.dest('dist/'));
});

gulp.task('uglify-libs', function(){
    return gulp.src(packageJson.assets.js.external)
        // .pipe(uglify())
        .pipe(concat('libs.min.js'))
        .pipe(header('/*! MediaArchiveApp libs (build '+date+') ma.atnartur.ru */' + "\r\n"))
        .pipe(gulp.dest('dist/'));
});

gulp.task('uglify-src', function(){
    var babel_plugins = [
        'transform-async-to-generator',
        'transform-runtime'
    ];
    
    if (argv.src_uglify === true){
        babel_plugins.push('transform-member-expression-literals');
        babel_plugins.push('transform-merge-sibling-variables');
        babel_plugins.push('transform-minify-booleans');
        babel_plugins.push('transform-property-literals');
    }
    
    var g = gulp.src(packageJson.assets.js.internal)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            plugins: babel_plugins
        }));
        
    if (argv.src_uglify === true) 
        g.pipe(uglify())
    
    return g
        .pipe(concat('src.min.js'))
        .pipe(header('/*! MediaArchiveApp src (build '+date+') ma.atnartur.ru */' + "\r\n"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'));
});


gulp.task('uglify', ['uglify-libs', 'uglify-src']);

gulp.task('exec-npm-install', function(cb) {
    return exec("npm i --production", {cwd: path.join(process.cwd(), './cache/app')}, function (error, stdout, stderr) {
        gutil.log('stdout: ' + stdout);
        gutil.log('stderr: ' + stderr);
        if (error !== null) {
            gutil.log('exec error: ' + error);
        }
        cb();
    });
});

gulp.task('exec-bower-install', function(cb) {
    return exec("bower i", {cwd: path.join(process.cwd(), './cache/app')}, function (error, stdout, stderr) {
        gutil.log('stdout: ' + stdout);
        gutil.log('stderr: ' + stderr);
        
        if (error !== null) 
            gutil.log('exec error: ' + error);
            
        cb();
    });
});

gulp.task('build-exe', function() {
    return gulp.src(['./cache/app/**/*'])
        .pipe(builder({
            version: 'v0.12.2',
            platforms: ['win'],
            buildType: 'versioned',
            quiet: true 
        }));
});

gulp.task('build-electron-exe', function() {
    gulp.src("./")
        .pipe(electron({
            src: './',
            packageJson: packageJson,
            release: './build',
            cache: './cache',
            version: 'v0.26.1',
            packaging: true,
            platforms: ['win32-ia32', 'darwin-x64'],
            platformResources: {
                darwin: {
                    CFBundleDisplayName: packageJson.name,
                    CFBundleIdentifier: packageJson.name,
                    CFBundleName: packageJson.name,
                    CFBundleVersion: packageJson.version,
                    // icon: 'gulp-electron.icns'
                },
                win: {
                    "version-string": packageJson.version,
                    "file-version": packageJson.version,
                    "product-version": packageJson.version,
                    // "icon": 'gulp-electron.ico'
                }
            }
        }))
        .pipe(gulp.dest(""));
});

gulp.task('build-copy', function(){
    return gulp.src([
        './**/*',
        '!./build/**/*',
        '!./build',
        '!./cache/**/*',
        '!./cache',
        '!./styles/**/*',
        '!./styles',
        '!./js/**/*',
        '!./js',
        '!./node_modules/**/*',
        '!./node_modules',
        '!./libs/**/*',
        '!./libs',
        '!./.gitignore',
        '!./*.log',
        '!./*.komodoproject',
        '!./config_sample.json',
        '!./start.bat',
        '!./gulpfile.js',
    ])
        .pipe(gulp.dest('./cache/app/'));
});

gulp.task('cache-app-clean', function(){
    return gulp.src('cache/app/', {read: false}).pipe(clean())
});
 
gulp.task('swig', function() {
    var data = packageJson;
    data.client_templates = fs.readFileSync('./templates/client_templates.html');
    return gulp.src('./templates/main.html')
        .pipe(swig({
            data: data
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', function(){
    argv.src_uglify = true;
    return runSequence(
        'dist-clean', // sync
		['uglify', 'css-libs-concat', 'less', 'fa-copy', 'swig'] // parallel
	);
});

gulp.task('build', function(){
    argv.src_uglify = true;
    return runSequence(
        ['dist-clean', 'cache-app-clean'],
		['uglify', 'css-libs-concat', 'less', 'fa-copy', 'swig'],
        'build-copy',
		['exec-npm-install'], //'exec-bower-install'
        'build-exe',
        'cache-app-clean'
	);
});


gulp.task('watch', function(){
    gulp.watch('styles/less/style.less', ['less-main']);
    gulp.watch('js/**/**', ['uglify-src']);
});