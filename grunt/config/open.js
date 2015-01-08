/**
 * Created by Justin on 1/8/2015.
 */
module.exports = function (grunt) {
    'use strict';

    return {
        server: {
            url: 'http://localhost:<%= express.api.options.port %>'
        }
    };
};