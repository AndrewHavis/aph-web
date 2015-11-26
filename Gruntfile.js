'use strict';

module.exports = function(grunt) {
    
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    
    // Project configuration.
    grunt.initConfig({
        
        clean: {
            tmp: ['./.tmp'],
            dist: ['./.tmp', './dist', './public']
        },
        
        mkdir: {
            all: {
              options: {
                create: ['./.tmp', './public']
              },
            },
          },

        copy: {
            init: {
                files: [
                    {expand: true, cwd: './theme/', src: ['**'], dest: './dev/'},
                ],
            },
            main: {
                files: [
                    {expand: true, cwd: './dev', src: ['**'], dest: './.tmp/'},
                ],
            },
            public: {
                files: [
                    {expand: true, cwd: './.tmp/', src: ['**'], dest: './public/'},
                    {expand: true, cwd: './public/concat/', src: ['**'], dest: './public/'}
                ],
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
            html: './dev/index.html',
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
        
        // Reload dev pages when I change them
        watch: {
          dev: {
            files: ['dev/**/*.*'],
            tasks: ['jshint', 'sass'],
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
    grunt.registerTask('build', ['clean:dist', 'mkdir:all', 'sass:dist', 'copy:main', 'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'copy:public', 'filerev', 'usemin']);
    grunt.registerTask('watch', ['watch:dev']);

};
