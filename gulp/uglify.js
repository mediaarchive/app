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
    webpack({
        context: __dirname + '/public/js',
        entry: [
            'babel-polyfill',
            "./run"
        ],
        output: {
            filename: 'src.min.js',
            path: './public/dist'
        },
        module: {
            preLoaders: [{
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: [
                    path.resolve(__dirname, "public/js")
                ]
            }],
            loaders: [{
                test: /\.jsx?$/,
                exclude: /\/node_modules\//,
                include: [
                    path.resolve(__dirname, "public/js")
                ],
                loaders: ['react-hot', 'babel-loader'],
                plugins: ['transform-runtime', 'transform-decorators-legacy']
            }]
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.NoErrorsPlugin()
        ]
    }, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        callback();
    });
});


gulp.task('uglify', ['uglify-src']); //'uglify-libs',