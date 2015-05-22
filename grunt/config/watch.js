/**
 * Created by kevin on 12/10/14.
 */
module.exports = function (grunt) {
    'use strict';

    return {
        "less": {
            "files": ['**/*.less'],
            "tasks": ['buildCss']
        }
    };
};