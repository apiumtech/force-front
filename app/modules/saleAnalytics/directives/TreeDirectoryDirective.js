/**
 * Created by apium on 5/13/15.
 */

define([
    'app'
], function (app) {
    'use strict';

    function TreeDirectoryDirective(RecursionHelper, $rootScope) {
        return {
            restrict: 'AE',
            scope: {
                treeList: '=treeDirectory',
                treeLevel: "=treeLevel"
            },
            templateUrl: 'app/modules/saleAnalytics/directives/treeDirectory.html?v='+ $rootScope.cacheBuster,
            compile: function (element) {
                return RecursionHelper.compile(element, function (scope, iElement, iAttrs, controller, transcludeFn) {
                    if (!scope.treeLevel) {
                        scope.treeLevel = 0;
                    }
                });
            }
        };
    }

    app.register.directive('treeDirectory', ['RecursionHelper', '$rootScope', TreeDirectoryDirective]);

    return TreeDirectoryDirective;
});