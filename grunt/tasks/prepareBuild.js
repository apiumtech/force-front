/**
 * Created by justin on 5/20/15.
 */
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('prepareLessBuild', function () {
        var defineScript = '';
        var requirePaths = [];
        requirePaths.push('@import "bootstrap_import.less";');
        grunt.file.expand('app/**/*.less').forEach(function (path) {
            requirePaths.push('@import "../' + path + '";');
        });
        defineScript += requirePaths.join("");

        grunt.file.write('assets/main.build.less', defineScript);

        console.log("main.build.less created");
    });

    grunt.registerTask('prepareJsBuild', function () {
        var defineScript = 'define([';

        var requirePaths = [];

        grunt.file.expand([
            'app/**/*.js'
        ]).forEach(function (path) {
            path = path.replace('app/', '').replace('.js', '');
            if (path != 'main' && path != 'main.build')
                requirePaths.push("'" + path + "'");
        });

        requirePaths.push("'main'");

        defineScript += requirePaths.join(",") + '],function(){});';

        grunt.file.write('assets/main.build.js', defineScript);

        console.log("main.build.js created");
    });

    grunt.registerTask('prepareBuild', ['prepareLessBuild', 'prepareJsBuild']);
};