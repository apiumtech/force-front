/**
 * Created by kevin on 12/15/14.
 */
module.exports = function (grunt) {
    'use strict';

    return {
        'pull-design': {
            command: 'if cd force-design; then git pull; else git clone https://github.com/apiumtech/force-design.git --branch develop --single-branch force-design; fi'
        },
        'migrate-design': {
            command: 'cp -R force-design/assets/ ./assets && ' +
            'cp -Rf force-design/assets/plugins ./build/ && ' +
            'cp -Rf force-design/assets/css/fonts ./build/fonts'
        },
        'addFileToGit': {
            command: function (filePath) {
                return 'git add ' + filePath;
            }
        },
        'e2e': {
            // needs a webdriver already running:
            // $ webdriver-manager update && webdriver-manager start
            command: 'protractor test_e2e/protractor.conf.js'
        },
        'bump-version': {
            command: 'npm --no-git-tag-version version patch'
        }
    };
};