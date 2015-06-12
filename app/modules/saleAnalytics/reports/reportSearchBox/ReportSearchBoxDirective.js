/**
 * Created by apium on 6/4/15.
 */
define([
    'app',
    'modules/saleAnalytics/reports/reportSearchBox/ReportSearchBoxController'
], function (app, ReportSearchBoxController) {
    'use strict';

    function ReportSearchBoxDirective() {
        return {
            restrict: "EA",
            controller: ReportSearchBoxController,
            templateUrl: 'app/modules/saleAnalytics/reports/reportSearchBox/reportSearchBox.html'
        };
    }

    app.register.directive('reportSearchBox', [ReportSearchBoxDirective]);

    return ReportSearchBoxDirective;
});