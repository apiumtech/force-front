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

    grunt.registerTask('build', function () {
        //grunt.task.run(['karma:ci']);

        grunt.task.run(['prepareBuild']);
        grunt.task.run(['remove-old-build']);

        grunt.task.run(['less:dev', 'requirejs:newCompile']);
        grunt.task.run(['copy:productionBuild']);

        grunt.task.run(['htmlbuild']);
    });

    //grunt.registerTask('build', ['less:dev', 'requirejs:newCompile', 'copy:assets']);
};