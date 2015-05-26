/**
 * Created by justin on 5/21/15.
 */
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('gentest', function (classPath, defineScript) {
        if (!classPath)
            throw new Error("Class object must be specified");

        var testClass = 'test/src/' + classPath + 'TestSpec.js';

        if (grunt.file.exists(testClass))
            throw new Error("Test class at " + testClass + " already existed. Aborted");


        var classSegments = classPath.split('/');
        var className = classSegments[classSegments.length - 1];

        var appClass = 'app/' + classPath + '.js';
        if (!grunt.file.exists(appClass)) {
            defineScript = defineScript || '' +
                'define([\n' +
                '\t\n' +
                '], function() {\n' +
                '\t\'use strict\';\n' +
                '\n' +
                '\tfunction ' + className + '() {\n' +
                '\t\t\n' +
                '\t}\n' +
                '\n' +
                '\treturn ' + className + ';\n' +
                '});';
            grunt.file.write(appClass, defineScript);
            grunt.task.run(['shell:addFileToGit:' + appClass]);
            console.log("File ", appClass, " doesn't exist and is created successfully");
        }

        var defineTestScript = '' +
            'define([\n' +
            '\t\'' + classPath + '\'\n' +
            '], function(' + className + ') {\n' +
            '\t\'use strict\';\n' +
            '\n' +
            '\tdescribe(\'' + className + '\', function() {\n' +
            '\t\tit(\'First test for ' + className + '\', function() {\n' +
            '\t\t\tthrow new Error("No test defined for class ' + className + '");\n' +
            '\t\t});\n' +
            '\t\t\n' +
            '\t});\n' +
            '});';
        grunt.file.write(testClass, defineTestScript);
        grunt.task.run(['shell:addFileToGit:' + testClass]);
        console.log("File ", testClass, " created successfully");
    });
};