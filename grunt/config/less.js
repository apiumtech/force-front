/**
 * Created by kevin on 12/9/14.
 */
module.exports = function (grunt) {
    'use strict';

    return {
        'dev': {
            'options': {
                'paths': ['assets/', '/', 'force-design/assets/'],
                'cleancss': true,
                'optimize': 0,
                'strictImports': true,
                'strictMath': true,
                'strictUnits': true,
                'compress': true,
                'report': 'min'
            },
            'files': {
                'build/force-manager.min.css': 'assets/main.less'
            }
        }
    };
};