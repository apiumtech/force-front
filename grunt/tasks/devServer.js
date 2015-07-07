/**
 * Created by kevin on 12/9/14.
 */
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('dev-server', ['build', 'http-server:dev', 'keepalive']);
    grunt.registerTask('server-app', ['express:api', 'keepalive']);
};