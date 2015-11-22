'use strict';

module.exports = function(grunt) {
    
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        copy: {
            main: {
                files: [
                    {expand: true, cwd: './dev/', src: ['**'], dest: './public/'},
                ],
            },
            init: {
                files: [
                    {expand: true, cwd: './theme/', src: ['**'], dest: './dev/'},
                ],
            }
        }

    });

    // Default task(s).
    grunt.registerTask('default', ['build']);
    grunt.registerTask('init', ['copy:init']);
    grunt.registerTask('build', ['copy:main']);

};
