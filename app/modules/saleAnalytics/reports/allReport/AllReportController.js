define([
    'app',
    'modules/saleAnalytics/reports/allReport/AllReportView',
    'modules/saleAnalytics/directives/TreeListDirective'
], function (app, AllReportView) {
    'use strict';

    function AllReportController($scope) {
        AllReportController.configureView($scope);
    }

    AllReportController.configureView = function ($scope) {
        this.view = AllReportView.newInstance($scope);
        this.view.show();
    }

    app.register.controller('AllReportController', ['$scope', AllReportController]);

    return AllReportController;
});