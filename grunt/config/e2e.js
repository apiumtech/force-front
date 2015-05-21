/*
 * Created by joanllenas May 20th, 2015
 */

module.exports = function (grunt) {
    'use strict';

    return {
        'protractor': {
            'configFile': 'test_e2e/protractor.conf.js'
        }
    };
};