/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

var gulp = require('gulp'); 
var electron = require('gulp-electron');

gulp.task('build-electron-exe', function() {
    return gulp.src("./")
        .pipe(electron({
            src: './cache/app',
            packageJson: packageJson,
            release: './build',
            cache: './cache',
            version: 'v0.36.7',
            packaging: true,
            platforms: ['win32-ia32'],
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
        // '!./libs/**/*',
        // '!./libs',
        '!./.gitignore',
        '!./*.log',
        '!./*.komodoproject',
        '!./config_sample.json',
        '!./start.bat',
        '!./gulpfile.js',
    ])
        .pipe(gulp.dest('./cache/app/'));
});

gulp.task('build-electron-win', function(done) {
    packager({
        arch: 'ia32', // Allowed values: ia32, x64, all
        dir: './cache/app',
        platform: 'win32', // Allowed values: linux, win32, darwin, all
        "app-version": packageJson.version,
        cache: './cache',
        //icon:
        name: packageJson.name,
        out: './build/' + packageJson.version + '-' + moment().format('DD-MM-YYYY'),
        version: '0.36.7', // electron version
    }, function (err, appPath) { 
        if(err)
            throw err;
        
        done();
    });
});