/**
 * Created by Justin on 1/8/2015.
 */
module.exports = function (grunt) {
    'use strict';

    var path = require('path');

    return {
        'api': {
            'options': {
                'port': 8081,
                'hostname': '*',
                'server': path.resolve('./.serverApp/index.js'),
                'bases': [path.resolve('./')]
            }
        }
    };
};