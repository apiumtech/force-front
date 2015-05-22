/**
 * Created by justin on 5/22/15.
 */
module.exports = function (grunt) {
    'use strict';

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