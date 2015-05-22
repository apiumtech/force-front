/**
 * Created by justin on 5/21/15.
 */
module.exports = function (grunt) {
    grunt.registerTask('genroute', function (moduleName) {
        if (!moduleName)
            throw new Error("Module name must be specified");

        var modulePath = 'modules/' + moduleName;
        var routeDependencyName = modulePath + '/routes';
        var routePath = 'app/' + routeDependencyName + '.js';


        if (grunt.file.exists(routePath))
            throw new Error("Module '" + moduleName + "' routes already existed. Aborted");

        var defineRouteScript = "" +
            "define([], function () {\n" +
            "\t'use strict';\n" +
            "\treturn {\n" +
            "\t\tregister: function ($routeProvider, resolveRoute) {\n" +
            "\t\t\t\t$routeProvider\n\n" +
            "\t\t\t\t\t\t.when('put_your_route_here', resolveRoute('modules/" + moduleName + "/-your-controller-', 'modules/" + moduleName + "/-your-html-'))\n" +
            "\t\t\t;\n" +
            "\t\t}\n" +
            "\t};\n" +
            "});";

        grunt.file.write(routePath, defineRouteScript);
        grunt.task.run(['shell:addFileToGit:' + routePath]);
        console.log("File ", routePath, " created successfully. Updating Route configuration file");

        var routeConfigFile = 'app/routeConf.js';
        var routeConf = grunt.file.read(routeConfigFile);
        routeConf = routeConf.replace('// ==more---routes---config---here==', ", '" + routeDependencyName + "'\n\t// ==more---routes---config---here==");

        grunt.file.write(routeConfigFile, routeConf);
        console.log("Route config file updated");
    });
};