/**
 * Created by kevin on 12/9/14.
 */
module.exports = function (grunt) {
    'use strict';

    return {
        compile: {
            options: {
                baseUrl: './',
                mainConfigFile: 'require.cfg.js',
                name: 'app/main.js',
                out: 'build/force-manager.min.js',
                optimize: 'none'
            }
        }
    };
};