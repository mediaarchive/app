module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //uglify: {
        //    options: {
        //        banner: '/* RVM.js (build <%= grunt.template.today("yyyy-mm-dd") %>) */' + "\r\n"
        //    },
        //    rvmjs: {
        //        src: ['public/player/rvm.js'],
        //        dest: 'public/player/rvm.min.js'
        //    }
        //},
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
        //less: {
        //    main: {
        //        options: {
        //            cleancss: true
        //        },
        //        files: {
        //            "public/styles/site/css/base.min.css": "public/styles/site/less/base.less",
        //            "public/styles/site/css/login.min.css": "public/styles/site/less/login.less",
        //            "public/styles/webapp/css/base.min.css": "public/styles/webapp/less/base.less",
        //            "public/styles/site/css/org_and_users.min.css": "public/styles/site/less/org_and_users.less"
        //        }
        //    },
        //    bootstrap: {
        //        options: {
        //            cleancss: true
        //        },
        //        files: {
        //            "public/styles/libs/bootstrap/bootstrap_custom.min.css": "public/styles/libs/bootstrap/src/less/bootstrap.less"
        //        }
        //    }
        //},
        ////copyto: {
        ////    main: {
        ////        files: [
        ////            {
        ////                //cwd: '',
        ////                src: [
        ////                    '**/**',
        ////                    '**/.htaccess',
        ////                    '!**/node_modules/**',
        ////                    '!**/static/files/**',
        ////                    '!**/tmp/daemon_log/**',
        ////                    '!**/tmp/log/**',
        ////                    '!**/build/**',
        ////                    '!**/gruntfile.js'
        ////                ],
        ////                dest: dest
        ////            }
        ////        ]
        ////    }
        ////},
        //remove: {
        //    build_dir: {
        //        dirList: [
        //            dest
        //        ]
        //    }
        //},
        //copy: {
        //    main: {
        //        files: [
        //            // includes files within path and its sub-directories
        //            {
        //                expand: true,
        //                src: [
        //                    './**',
        //                    '!./node_modules/**',
        //                    '!./vendor/**',
        //                    '!./gruntfile.js',
        //                    '!./public/files/**',
        //                    '!./public/styles/libs/bootstrap/src/**',
        //                ],
        //                dest: dest
        //            },
        //        ],
        //    },
        //},
        //exec:{
        //    get_branch:{
        //        cmd: 'git status --branch -s',
        //        stdout: false,
        //        stderr: false,
        //        callback: function(error, stdout, stderr){
        //            var strs = stdout.split("\n");
        //            
        //            git_branch = strs[0].replace('## ', '');
        //            
        //            grunt.log.writeln("git branch: " + git_branch);
        //        }
        //    },
        //    npm_install: {
        //        cwd: dest,
        //        cmd: 'npm i'
        //    },
        //    composer_install: {
        //        cwd: dest,
        //        cmd: 'php composer.phar update'
        //    }
        //},
        //"file-creator": {
        //    "version": {
        //        "./config/version.json": function(fs, fd, done) {
        //            var first = grunt.config.get('version');
        //            
        //            
        //            if (grunt.cli.options.ver)
        //                ver = grunt.cli.options.ver;
        //            else if (first.link) 
        //                ver = first.ver;
        //            else
        //                ver = "1.0";
        //                
        //            
        //            if (grunt.cli.options.status)
        //                status = grunt.cli.options.status;
        //            else if (first.status) 
        //                status = first.status;
        //            else
        //                status = "beta";
        //            
        //            
        //            if (grunt.cli.options.link)
        //                link = grunt.cli.options.link;
        //            else if (first.link) 
        //                link = first.link;
        //            else
        //                link = "clienddev.ru";
        //            
        //            
        //            if (first.build) 
        //                var build = first.build + 1;
        //            else
        //                var build = 1;
        //            
        //            
        //            var date = new Date();
        //            var month   = (date.getMonth()   < 10) ? '0' + date.getMonth()   : date.getMonth();
        //            var day     = (date.getDay()     < 10) ? '0' + date.getDay()     : date.getDay();
        //            var hours   = (date.getHours()   < 10) ? '0' + date.getHours()   : date.getHours();
        //            var minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        //            var seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
        //            
        //            var build_date = date.getFullYear() + '-' + month + '-' + day + '_' + hours + '-' + minutes + '-' + seconds;
        //                    
        //            fs.writeSync(fd, JSON.stringify({
        //                ver: ver,
        //                branch: git_branch,
        //                build_date: build_date,
        //                build: build,
        //                status: status,
        //                link: link
        //            }));
        //            //grunt.log.write(this.version);process.exit();
        //            done();
        //        }
        //    },
        //    'config_server': {
        //        files: [{
        //            file: dest + 'config/server.json',
        //            method: function(fs, fd, done) {
        //                if (grunt.cli.options.config && config_server[grunt.cli.options.config]) {
        //                    grunt.log.write(grunt.cli.options.config);
        //                    fs.writeSync(fd, JSON.stringify(config_server[grunt.cli.options.config]));
        //                }
        //                
        //                done();
        //            }
        //        }]
        //    }
        //}
        swig_it: {
            index: {
                src: ['templates/*.html'],
                dest: "."
            }
        },
        watch: {
            site: {
                files: [
                    'templates/index.html',
                    'static/*'
                ],
                tasks: ['app'],
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
            src: ['./**/*'] // Your node-webkit app 
        },
    });
    
    //grunt.loadNpmTasks('grunt-wait');
    grunt.loadNpmTasks('grunt-swig-it');
    //grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    //grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-file-creator');
    //grunt.loadNpmTasks('grunt-exec');
    //grunt.loadNpmTasks('grunt-copy-to');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('default', ['remove:index', 'swig_it:index']);
    grunt.registerTask('build', ['default', 'nodewebkit']);
    
}