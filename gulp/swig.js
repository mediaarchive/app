/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

var gulp = require('gulp'); 
var swig = require('gulp-swig');

gulp.task('swig', function() {
    var data = packageJson;
    data.client_templates = fs.readFileSync('./templates/client_templates.html');
    return gulp.src('./templates/main.html')
        .pipe(swig({
            data: data
        }))
        .pipe(gulp.dest('./'));
});
