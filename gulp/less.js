/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less-main', function() {
    return gulp.src('styles/less/style.less')
        .pipe(less())
        .pipe(nano())
        .pipe(rename('src.min.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('less', ['less-main']);