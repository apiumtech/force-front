module.exports = function (grunt) {
    'use strict';

    return {
        'dev': {
            'port': "8085",
            'host': '0.0.0.0',
            'cache': 1,
            'showDir': false,
            'autoIndex': false,
            'runInBackground': true
        }
    };
};