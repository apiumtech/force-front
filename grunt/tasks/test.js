/**
 * Created by kevin on 12/9/14.
 */
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('test', ['karma:ci']);
    grunt.registerTask('coverage', ['jshint:jenkins']);
};
