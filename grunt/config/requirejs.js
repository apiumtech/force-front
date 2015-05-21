/**
 * Created by kevin on 12/9/14.
 */
module.exports = function (grunt) {
    'use strict';

    return {
        compile: {
            options: {
                mainConfigFile: 'require.build-cfg.js',
                optimize: 'none'
            }
        },
        newCompile: {
            options: {
                mainConfigFile: 'require.cfg.js',
                name: '../assets/main.build',
                out: 'build/application.min.js',
                optimize: 'none'
            }
        }
    };
};