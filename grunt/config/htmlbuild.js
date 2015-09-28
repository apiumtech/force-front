/**
 * Created by justin on 5/2/15.
 */
module.exports = function (grunt) {
    'use strict';

    return {
        dist: {
            src: 'index.html',
            dest: 'build/www',
            options: {
                beautify: true,
                prefix: '',
                relative: true,
                scripts: {
                    main: 'build/www/build/application.min.js'
                }
            }
        }
    };

};