'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './public/css/main.css': [
                        './dev/bootstrap.scss',
                        './dev/variables.scss'
                    ]
                }
            }
        },
        copy: {
          main: {
            files: [
              // copy index.html
              {expand: true, flatten: true, src: ['dev/index.html'], dest: 'public/', filter: 'isFile'},
            ],
          },
        }
    });

    grunt.registerTask('default', ['sass', 'copy']);
    
}