/**
 * Created by Justin on 4/3/2015.
 */
module.exports = function (grunt) {

    var buildPath = 'build/www';

    return {
        assets: {
            files: [
                {
                    expand: true,
                    cwd: 'assets',
                    src: ['fonts/**', 'images/**', 'img/**', 'fonts/**', 'favicon.ico'],
                    dest: 'build'
                }
            ]
        },
        productionBuild: {
            files: [
                {
                    src: ['build/favicon.ico'],
                    dest: buildPath + '/favicon.ico'
                },
                {
                    src: ['build/css/force-manager.min.css'],
                    dest: buildPath + '/build/css/force-manager.min.css'
                },
                {
                    src: 'build/application.min.js',
                    dest: buildPath + '/build/application.min.js'
                },
                {
                    src: 'node_modules/requirejs/require.js',
                    dest: 'require.js'
                },
                {
                    src: 'node_modules/requirejs/require.js',
                    dest: buildPath + '/require.js'
                },
                {
                    src: 'require.cfg.js',
                    dest: buildPath + '/require.cfg.js'
                },
                {
                    src: 'requireConf.js',
                    dest: buildPath + '/requireConf.js'
                },
                {
                    expand: true,
                    cwd: 'app',
                    src: ['**/*.html'],
                    dest: buildPath + '/app'
                },
                {
                    expand: true,
                    cwd: 'assets',
                    src: ['fonts/**', 'images/**', 'img/**'],
                    dest: buildPath + '/build'
                },
                {
                    expand: true,
                    cwd: 'assets',
                    src: ['crossbrowserjs/**', 'js/**', 'images/**', 'img/**'],
                    dest: buildPath + '/assets'
                }
            ]
        }
    }
};