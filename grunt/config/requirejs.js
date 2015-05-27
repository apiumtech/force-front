/**
 * Created by kevin on 12/9/14.
 */
module.exports = function (grunt) {
    'use strict';

    return {
        newCompile: {
            options: {
                mainConfigFile: 'requireConf.build.js',
                name: '../assets/main.build',
                out: 'build/application.min.js',
                optimize: 'none'
            }
        }
    };
};