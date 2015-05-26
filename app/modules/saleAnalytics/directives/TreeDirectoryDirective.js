/**
 * Created by apium on 5/13/15.
 */

define([
    'app'
], function (app) {
    'use strict';

    function TreeDirectoryDirective(RecursionHelper) {
        return {
            restrict: 'AE',
            scope: {
                treeList: '=treeDirectory',
                groupSelectionChanged: "&",
                selectionChanged: "&"
            },
            templateUrl: 'app/modules/saleAnalytics/reports/directive/treeDirectory.html',
            compile: function (element) {
                return RecursionHelper.compile(element, function (scope, iElement, iAttrs, controller, transcludeFn) {
                    //
                });
            }
        };
    }

    app.register.directive('treeDirectory', ['RecursionHelper', TreeDirectoryDirective]);

    return TreeDirectoryDirective;
});