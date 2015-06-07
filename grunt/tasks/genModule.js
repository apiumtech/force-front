/**
 * Created by justin on 5/22/15.
 */
var TemplateParser = require(__dirname + '/../../.scaffolding/TemplateParser');

module.exports = function (grunt) {
    'use strict';

    var templateParser = new TemplateParser();

    grunt.registerTask('genModule', function (modulePath, featureName) {
        if (!modulePath || !featureName)
            throw new Error("Module Path and Feature Name must be specified");

        [
            'Controller',
            'Model',
            'View',
            'Presenter'
        ].forEach(function (type) {
                var classPath = 'modules/' + modulePath + '/' + featureName + type;

                grunt.task.run(['gentest:' + classPath]);
            });
    });
};