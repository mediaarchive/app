/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

"use strict";

var gulp = require('gulp'); 
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var header = require('gulp-header');
var argv = require('optimist').argv;
var sourcemaps = require('gulp-sourcemaps');
var packageJson = require('./../package.json');

var phpjs = require('phpjs');
var date = phpjs.date('d.m.Y H:i:s');

gulp.task('uglify-libs', function(){
	return gulp.src(packageJson.assets.js.external)
		// .pipe(uglify())
		.pipe(concat('libs.min.js'))
		.pipe(header('/*! MediaArchiveApp libs (build '+date+') ma.atnartur.ru */' + "\r\n"))
		.pipe(gulp.dest('public/dist/'));
});

gulp.task('uglify-src', function(){
	var babel_plugins = [
		'transform-async-to-generator',
		// 'transform-runtime',
		"transform-react-jsx"
	];
	
	// if (argv.src_uglify === true){
		babel_plugins.push('transform-member-expression-literals');
		babel_plugins.push('transform-merge-sibling-variables');
		babel_plugins.push('transform-minify-booleans');
		babel_plugins.push('transform-property-literals');
	// }s
	
	let arr = [];
	
	packageJson.assets.js.internal.forEach((val) => {
		arr.push('public/' + val);
	});

	var g = gulp.src(arr)
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
		.pipe(gulp.dest('public/dist/'));
});


gulp.task('uglify', [ 'uglify-src']); //'uglify-libs',