module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* SchoolMediaApp (build <%= grunt.template.today("yyyy-mm-dd") %>) */' + "\r\n"
            },
            scripts: {
                src: [  
                    'js/general.js',
                    'js/base.js',
                    'js/local_data.js',
                    'js/pages.js',
                    'js/settings.js',
                    'js/view.js',
                    'js/data/base.js',
                    'js/data/file.js',
                    
                    'js/models/Event.js',
                    'js/collections/Events.js',
                    
                    'js/run.js',
                ],
                dest: 'scripts.min.js',
                sourceMap: true
            }
        },
        //cssmin: {
        //    main: {
        //        options: {
        //            //banner: '/* My minified css file */'
        //        },
        //        files: {
        //            '<%= pkg.proj_dir %>/static/styles/all.min.css': ['<%= pkg.proj_dir %>/static/styles/**.css']
        //        }
        //    }
        //},
        less: {
            main: {
                options: {
                    cleancss: true
                },
                files: {
                    "static/styles/css/style.min.css": "static/styles/less/style.less"
                }
            }
        },
        swig_it: {
            index: {
                src: ['templates/*.html'],
                dest: "."
            }
        },
        watch: {
            templates: {
                files: [
                    'templates/index.html'
                ],
                tasks: ['swig_it'],
                options: {
                    spawn: false
                },
            },
            styles: {
                files: [
                    'static/styles/less/*'
                ],
                tasks: ['less:main'],
                options: {
                    spawn: false
                },
            },
            scripts: {
                files: [
                    'js/**/*'
                ],
                tasks: ['uglify:scripts'],
                options: {
                    spawn: false
                },
            }
        },
        clean: {
            options:{
                force: true
            },
            site: {
                src: ['./index.html']
            },
        },
        remove: {
            options: {
                trace: true
            },
            index:{
                fileList: ['index.html']
            },
        },
        nodewebkit: {
            options: {
                platforms: ['win'],
                buildDir: './builds', // Where the build version of my node-webkit app is saved 
            },
            src: [
                './**/*',
                '!./templates',
                '!./.gitignore',
                '!./gruntfile.js',
            ] // Your node-webkit app 
        },
        copy: {
            prepare_scriptsbin: {
                files: [
                    {
                        expand: true,
                        src: ['scripts.min.js'],
                        dest: 'cache/scripts.bin'
                    },
                ],
            },
        },
        exec: {
            compile_scriptsbin: {
                cmd: 'nwsnapshot cache/scripts.bin'
            }
        }
    });
    
    //grunt.loadNpmTasks('grunt-wait');
    grunt.loadNpmTasks('grunt-swig-it');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks('grunt-exec');
    //grunt.loadNpmTasks('grunt-copy-to');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('default', ['clean', 'remove', 'swig_it', 'less', 'uglify']);
    grunt.registerTask('build', ['default', 'copy:prepare_scriptsbin', 'exec:compile_scriptsbin', 'nodewebkit']);
    
}