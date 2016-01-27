define([
    'app',
    'modules/saleAnalytics/reports/reportItem/ReportItemController'
], function (app, ReportItemController) {
    'use strict';

    function ReportItemDirective($rootScope) {
        return {
            restrict: "EA",
            require: "treeDirectory",
            scope: {
                report: "=",
                fireOpenFolder: "="
            },
            controller: 'ReportItemController',
            templateUrl: 'app/modules/saleAnalytics/reports/reportItem/reportItem.html?v='+ $rootScope.cacheBuster
        };
    }

    app.register.directive('reportItem', ['$rootScope', ReportItemDirective]);

    return ReportItemDirective;
});