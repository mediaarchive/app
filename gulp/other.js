/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

var gulp = require('gulp'); 
var concat = require('gulp-concat');
var header = require('gulp-header');
var replace = require('gulp-replace');
var nano = require('gulp-cssnano');
var packageJson = require('./../package.json');
var cssBase64 = require('gulp-css-base64');

var phpjs = require('phpjs');
var date = phpjs.date('d.m.Y H:i:s');

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
