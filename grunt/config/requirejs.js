/**
 * Created by kevin on 12/9/14.
 */
module.exports = function (grunt) {
    'use strict';

    return {
        compile: {
            options: {
                mainConfigFile: 'require.build-cfg.js',
                name: 'main',
                out: 'build/force-manager.min.js',
                optimize: 'none'
            }
        }
    };
};