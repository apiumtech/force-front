/**
 * Created by kevin on 12/9/14.
 */
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('reload-design', ['shell:pull-design', 'shell:migrate-design', 'less:dev']);
};