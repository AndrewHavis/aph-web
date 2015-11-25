'use strict';

module.exports = function(grunt) {
    
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        
        clean: {
            tmp: ['./.tmp'],
            dist: ['./dist', './public']
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
        }
        
    });

    // Default task(s).
    grunt.registerTask('default', ['build']);
    grunt.registerTask('init', ['copy:init']);
    grunt.registerTask('build', ['clean:dist', 'mkdir:all', 'sass:dist', 'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'copy:main', 'filerev', 'usemin']);

};
