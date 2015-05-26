define([
    'app',
    'modules/saleAnalytics/reports/ReportView',

    'modules/saleAnalytics/reports/allReport/AllReportController',
    'modules/saleAnalytics/reports/favouriteReport/FavouriteReportController',
    'modules/saleAnalytics/reports/searchReport/SearchReportController'
], function (app, ReportView) {
    'use strict';

    function ReportController($scope) {
        ReportController.configureView($scope);
    }

    ReportController.configureView = function ($scope) {
        this.view = ReportView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('ReportController', ['$scope', ReportController]);

    return ReportController;
});