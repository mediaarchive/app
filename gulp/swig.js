/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

var gulp = require('gulp'); 
var swig = require('gulp-swig');
var packageJson = require('./../package.json');
var fs = require('fs');

gulp.task('swig', function() {
    var data = packageJson;
    data.client_templates = fs.readFileSync('./views/client_templates.html');
    return gulp.src('./views/main.html')
        .pipe(swig({
            data: data
        }))
        .pipe(gulp.dest('./'));
});
