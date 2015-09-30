/**
 * Created by kevin on 12/9/14.
 */
module.exports = function (grunt) {
    'use strict';

    var buildPath = 'build';

    grunt.registerTask('remove-old-build', function () {
        if (grunt.file.exists(buildPath))
            grunt.file.delete(buildPath);
    });

    grunt.registerTask('buildCss', function () {
        grunt.task.run(['prepareBuild']);

        grunt.task.run(['less:dev']);

        grunt.task.run(['copy:assets']);
    });

    grunt.registerTask('build', function () {
        grunt.task.run(['shell:bump-version']);
        grunt.task.run(['prepareBuild']);
        grunt.task.run(['remove-old-build']);

        grunt.task.run(['less:dev']);
        grunt.task.run(['requirejs:newCompile']);

        grunt.task.run(['copy:assets']);
        grunt.task.run(['copy:productionBuild']);

        grunt.task.run(['htmlbuild']);
        grunt.task.run(['string-replace']);//appends a version number to the main script tag so it is cached only for that particular version.

        grunt.task.run(['delete.mainBuild']);
    });

    grunt.registerTask('testAndBuild', ['karma:ci', 'build']);

    grunt.registerTask('delete.mainBuild', function () {
        grunt.file.delete('assets/main.build.js');
        grunt.file.delete('assets/main.build.less');
        grunt.file.delete('requireConf.build.js');
    });
};