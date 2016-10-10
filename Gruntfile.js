'use strict';

module.exports = function(grunt) {
    
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    
    // Project configuration.
    grunt.initConfig({
        
        clean: {
            tmp: ['./.tmp'],
            dist: ['./.tmp', './dist', './public'],
            images: ['./.tmp/img/**/']
        },
        
        jshint: {
            all: {
                options: {
                  curly: true,
                  eqeqeq: true,
                  eqnull: true,
                  esnext: true,
                  browser: true,
                  node: true,
                  globals: {
                    angular: true,
                    jQuery: true
                  },
                },
                src: [
                    './*.js',
                    './dev/**/*.js'
                ]
            }
        },
        
        mkdir: {
            all: {
              options: {
                create: ['./.tmp', './tmp/img', './public']
              },
            },
        },

        copy: {
            init: {
                files: [
                    {expand: true, cwd: './theme/', src: ['**'], dest: './dev/'},
                ],
            },
            tmp: {
                files: [
                    {expand: true, cwd: './dev', src: ['**'], dest: './.tmp/'},
                ],
            },
            images: {
                files: [
                    {expand: true, cwd: './dev/img', src: ['banner-bg.jpg', 'flake.png', 'intro-bg.jpg', 'loading.png'], dest: './.tmp/img'}, /* Only copy the images we need */
                ]
            },
            public: {
                files: [
                    {expand: true, cwd: './.tmp/', src: ['**'], dest: './public/'},
                    {expand: true, cwd: './public/concat/', src: ['**'], dest: './public/'}
                ],
            }
        },
        
        wiredep: {
            task: {
                src: [
                    '.tmp/index.html'
                ]
            }
        },
        
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './dev/css/landing-page.css': './dev/css/landing-page.scss'
                }
            }
        },
        
        useminPrepare: {
            html: './.tmp/index.html',
            options: {
                dest: './public'
            }
        },
        
        usemin: {
            html: './public/{,*/}*.html',
            css: './public/css/{,*/}*.css',
            js: './public/js/{,*/}*.js',
            options: {
                assetsDirs: ['./public']
            }
        },
        
        filerev: {
            dist: {
                src: ['./public/css/{,*/}*.css', './public/js/{,*/}*.js'],
            }
        },
        
        // Set up servers
        express: {
            options: {
                script: './app.js',
                fallback: function() {
                    console.error('ERROR: Cannot start the server properly.');
                },
            },
            dev: {
                node_env: 'development'
            },
            prod: {
                node_env: 'production'
            }
        },
        
        // Reload dev pages when I change them
        watch: {
          dev: {
            files: ['dev/**/*.*'],
            tasks: ['jshint:all', 'sass:dist'],
            options: {
                spawn: false,
                livereload: true,
                livereloadOnError: false
            },
          },
        }
        
    });

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('init', ['copy:init']);
    grunt.registerTask('build', ['jshint:all', 'clean:dist', 'mkdir:all', 'sass:dist', 'copy:tmp', 'clean:images', 'copy:images', 'wiredep', 'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'copy:public', 'filerev', 'usemin']);
    grunt.registerTask('server', ['express:dev', 'watch']);

};
