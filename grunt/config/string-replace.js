module.exports = function (grunt) {
    'use strict';

    return {
        pkg: grunt.file.readJSON('package.json'),
        inline: {
            files: {
                'build/www/': ['build/www/index.cfm.html', 'build/www/index.web.html'],
            },
            options: {
                replacements: [
                    {
                        pattern: '<script type="text/javascript" src="build/application.min.js"></script>',
                        replacement: '<script type="text/javascript" src="build/application.min.js?v=<%= pkg.version %>"></script>'
                    },
                    {
                        pattern: '<link href="build/css/force-manager.min.css" rel="stylesheet">',
                        replacement: '<link href="build/css/force-manager.min.css?v=<%= pkg.version %>" rel="stylesheet">'
                    },
                    {
                        pattern: '<body id="v0.0.0">',
                        replacement: '<body id="v<%= pkg.version %>">'
                    }
                ]
            }
        }
    };

};