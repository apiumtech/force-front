/**
 * Created by justin on 5/21/15.
 */
var TemplateParser = require(__dirname + '/../../.scaffolding/TemplateParser');

var types = [{
    regex: /Controller$/ig,
    type: "Controller"
}, {
    regex: /Presenter$/ig,
    type: "Presenter"
}, {
    regex: /View$/ig,
    type: "View"
}, {
    regex: /Model$/ig,
    type: "Model"
}];

module.exports = function (grunt) {
    'use strict';

    var templateParser = new TemplateParser();
    grunt.registerTask('gentest', function (classPath, defineScript) {
        if (!classPath)
            throw new Error("Class object must be specified");

        var testClass = 'test/src/' + classPath + 'TestSpec.js';

        if (grunt.file.exists(testClass))
            throw new Error("Test class at " + testClass + " already existed. Aborted");


        var classSegments = classPath.split('/');
        var className = classSegments[classSegments.length - 1];
        var classFeatureName = className.replace(/Controller$|Presenter$|View$|Model$/g, '');
        var classFeaturePath = classPath.substring(0, classPath.lastIndexOf('/')) + '/' + classFeatureName;

        var objToParse = {
            ClassName: className,
            ClassPath: classPath,
            PresenterPath: classFeaturePath + "Presenter",
            Presenter: classFeatureName + "Presenter",
            ViewPath: classFeaturePath + "View",
            View: classFeatureName + "View",
            ModelPath: classFeaturePath + "Model",
            Model: classFeatureName + "Model"
        };

        var appClass = 'app/' + classPath + '.js';
        var decidedClassType = decideClassType(classPath);
        if (!grunt.file.exists(appClass)) {

            var scriptTemplate = grunt.file.read('.scaffolding/_' + decidedClassType + '.scaff');
            defineScript = defineScript || templateParser.parseTemplate(scriptTemplate, objToParse);

            grunt.file.write(appClass, defineScript);
            grunt.task.run(['shell:addFileToGit:' + appClass]);
            console.log("File ", appClass, " doesn't exist and is created successfully");
        }

        var testSpecTemplatePath = '.scaffolding/_' + decidedClassType + 'TestSpec.scaff';
        if (!grunt.file.exists(testSpecTemplatePath)) {
            testSpecTemplatePath = '.scaffolding/_defaultClassTestSpec.scaff';
        }
        var testScriptTemplate = grunt.file.read(testSpecTemplatePath);
        var defineTestScript = templateParser.parseTemplate(testScriptTemplate, objToParse);

        grunt.file.write(testClass, defineTestScript);
        grunt.task.run(['shell:addFileToGit:' + testClass]);
        console.log("File ", testClass, " created successfully");
    });

    function decideClassType(className) {
        for (var i = 0; i < types.length; i++) {
            var typeCase = types[i];
            var matchClassType = typeCase.regex.test(className);

            if (matchClassType) {
                return typeCase.type;
            }
        }
        return "defaultClass";
    }
};