/**
 * Created by kevin on 12/9/14.
 */
module.exports = function (grunt) {
    'use strict';

    //grunt.registerTask('dev-server', ['less:dev', 'http-server:dev', 'watch:less']);
    grunt.registerTask('prod-server', ['less:dev', 'express:api', 'express-keepalive']);
};