/**
 * Created by kevin on 12/9/14.
 */
module.exports = function (grunt) {
    'use strict';

    var buildPath = 'build';

    function copyToProduction(x) {
        var baseWWW = buildPath + '/www/';

        var targetPath = null;
        var originPath = null;
        if (x.copyfrom) {
            originPath = x.copyfrom;
            targetPath = baseWWW + x.copyto;
        } else {
            originPath = x;
            targetPath = baseWWW + x;
        }
        if (grunt.file.isFile(originPath)) {
            grunt.file.copy(originPath, targetPath);
        }
    }

    grunt.registerTask('copy-to-production', function () {
        var baseWWW = buildPath + '/www/';

        if (grunt.file.exists(baseWWW))
            grunt.file.delete(baseWWW);

        [
            'app/**/*.html',
            'require.cfg.js',
            'assets/fonts/*',
            'assets/img/*',
            'assets/images/*',
            'build/application.min.js',
            'build/css/*',
            {copyfrom: 'node_modules/requirejs/require.js', copyto: 'require.js'}
        ].forEach(copyToProduction);
    });

    grunt.registerTask('remove-old-build', function () {
        if (grunt.file.exists(buildPath))
            grunt.file.delete(buildPath);
    });

    grunt.registerTask('buildCss', function () {
        grunt.task.run(['prepareBuild']);

        grunt.task.run(['less:dev']);

        grunt.task.run(['delete.mainBuild']);

        grunt.task.run(['copy:assets']);
    });

    grunt.registerTask('build', function () {
        grunt.task.run(['prepareBuild']);
        grunt.task.run(['remove-old-build']);

        grunt.task.run(['less:dev', 'requirejs:newCompile']);

        grunt.task.run(['delete.mainBuild']);

        grunt.task.run(['copy:assets']);
        grunt.task.run(['copy:productionBuild']);

        grunt.task.run(['htmlbuild']);
    });

    grunt.registerTask('testAndBuild', ['karma:ci', 'build']);

    grunt.registerTask('delete.mainBuild', function () {
        grunt.file.delete('assets/main.build.js');
        grunt.file.delete('assets/main.build.less');
    });

    //grunt.registerTask('build', ['less:dev', 'requirejs:newCompile', 'copy:assets']);
};