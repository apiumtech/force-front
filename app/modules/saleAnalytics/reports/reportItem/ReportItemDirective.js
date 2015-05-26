define([
    'app',
    'modules/saleAnalytics/reports/reportItem/ReportItemController'
], function (app, ReportItemController) {
    'use strict';

    function ReportItemDirective() {
        return {
            restrict: "EA",
            scope: {
                report: "="
            },
            controller: ['$scope', '$element', ReportItemController],
            templateUrl: 'app/modules/saleAnalytics/reports/reportItem/reportItem.html'
        }
    }

    app.register.directive('reportItem', [ReportItemDirective]);

    return ReportItemDirective;
});