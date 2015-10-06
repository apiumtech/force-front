define([
    'app'
], function (app) {
    'use strict';

    function CellCompilerDirective($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.cellCompiler);
                }, function (value) {
                    // Incase value is a TrustedValueHolderType, sometimes it
                    // needs to be explicitly called into a string in order to
                    // get the HTML string.
                    element.html(value && value.toString());
                    // If scope is provided use it, otherwise use parent scope
                    var compileScope = scope;
                    if (attrs.cellCompilerScope) {
                        compileScope = scope.$eval(attrs.cellCompilerScope);
                    }
                    $compile(element.contents())(compileScope);
                });
            }
        };
    }

    app.register.directive('cellCompiler', ['$compile', CellCompilerDirective]);

    return CellCompilerDirective;
});