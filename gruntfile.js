module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            scripts: {
                options:{
                    sourceMap: true,
                },
                src: [  
                    'js/general.js',
                    'js/base.js',
                    'js/local_data.js',
                    'js/pages.js',
                    'js/events_init.js',
                    'js/index_update.js',
                    'js/vk.js',
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
            },
            //scripts_stable: {
            //    options:{
            //        banner: 'var ver_stable=true;',
            //    },
            //    src: [
            //        'js/general.js',
            //        'js/base.js',
            //        'js/local_data.js',
            //        'js/pages.js',
            //        'js/settings.js',
            //        'js/view.js',
            //        'js/data/base.js',
            //        'js/data/file.js',
            //
            //        'js/models/Event.js',
            //        'js/collections/Events.js',
            //
            //        'js/run.js',
            //    ],
            //    dest: 'scripts.min.js',
            //    sourceMap: true
            //}
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
            after_build: {
                options:{
                    trace: false
                },
                dirList: ['cache/app'],
                fileList: ['scripts.bin']
            }
        },
        nwjs: {
            options: {
                platforms: ['win'],
                buildDir: './builds', // Where the build version of my node-webkit app is saved 
            },
            build: [
                './cache/app/**/*'
            ] // Your node-webkit app 
        },
        exec: {
            build_npm_install: {
                cmd: 'npm install --production',
                cwd: 'cache/app',
                stdout: true,
                stderr: true
            }
        },
        mkdir: {
            cache: {
                options: {
                    mode: 700,
                    create: ['cache']
                },
            },
            cache_app: {
                options: {
                    mode: 700,
                    create: ['cache/app']
                },
            },
        },
        copy: {
            before_build: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        src: [
                            './**/*',
                            '!./builds/**/*',
                            '!./cache/**/*',
                            '!./static/styles/less/**/*',
                            '!./js/**/*',
                            './js/config.json',
                            '!./node_modules/**/*',
                            '!./templates/**',
                            '!./.gitignore',
                            '!./*.log',
                            '!./*.komodoproject',
                            '!./bower.json',
                            '!./gruntfile.js',
                        ],
                        dest: 'cache/app'
                    },
                ],
            }
        },
    });
    
    grunt.loadNpmTasks('grunt-swig-it');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-nw-builder');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    
    grunt.registerTask('default', ['clean', 'remove', 'swig_it', 'less', 'uglify:scripts']);
    grunt.registerTask('prod_build', [
        'default',
        
        'mkdir:cache',
        'mkdir:cache_app',
        'copy:before_build',
        'exec:build_npm_install',
        
        'nwjs:build',
        
        'remove:after_build'
    ]);
};