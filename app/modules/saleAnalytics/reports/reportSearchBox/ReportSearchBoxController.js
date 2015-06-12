define([
    'app',
    'modules/saleAnalytics/reports/reportSearchBox/ReportSearchBoxView'
], function (app, ReportSearchBoxView) {
    'use strict';

    function ReportSearchBoxController($scope, $element) {
        ReportSearchBoxController.configureView($scope, $element);
    }

    ReportSearchBoxController.configureView = function ($scope, $element) {
        this.view = ReportSearchBoxView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('ReportSearchBoxController', ['$scope', '$element', ReportSearchBoxController]);

    return ReportSearchBoxController;
});