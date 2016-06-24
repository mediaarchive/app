/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

var gulp = require('gulp'); 
var gutil = require('gulp-util');
var exec = require('child_process').exec;

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