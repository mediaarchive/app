/*
 * @Author: Artur Atnagulov (ClienDDev team)
 */

"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var header = require('gulp-header');
var argv = require('optimist').argv;
var gutil = require("gulp-util");
var webpack = require("webpack");
var path = require('path');
var webpack_conf = require('./../webpack.config.js');
var packageJson = require('./../package.json');

var phpjs = require('phpjs');
var date = phpjs.date('d.m.Y H:i:s');

gulp.task('uglify-libs', function() {
    return gulp.src(packageJson.assets.js.external)
        // .pipe(uglify())
        .pipe(concat('libs.min.js'))
        .pipe(header('/*! MediaArchiveApp libs (build ' + date + ') ma.atnartur.ru */' + "\r\n"))
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('uglify-src', function(callback) {
    webpack(webpack_conf, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        
        gutil.log("[webpack]", stats.toString({
            colors: true,
            minimal: true,
            chunks: false
        }));
        
        callback();
    });
});


gulp.task('uglify', ['uglify-src']); //'uglify-libs',