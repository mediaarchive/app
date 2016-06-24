/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

var gulp = require('gulp'); 
var clean = require('gulp-clean');

gulp.task('dist-clean', function(cb){
    return gulp.src('public/dist/', {read: false}).pipe(clean())
});

gulp.task('cache-app-clean', function(){
    return gulp.src('cache/app/', {read: false}).pipe(clean())
});

