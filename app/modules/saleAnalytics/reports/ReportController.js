define([
    'app',
    'modules/saleAnalytics/reports/ReportView',

    'modules/saleAnalytics/reports/allReport/AllReportController',
    'modules/saleAnalytics/reports/favouriteReport/FavouriteReportController',
    'modules/saleAnalytics/reports/searchReport/SearchReportController',
    'modules/saleAnalytics/reports/reportFilter/ReportFilterController',

    'modules/saleAnalytics/reports/reportItem/ReportItemDirective'
], function (app, ReportView) {
    'use strict';

    function ReportController($scope, $modal) {
        $scope.$modal = $modal;
        ReportController.configureView($scope);
    }

    ReportController.configureView = function ($scope) {
        this.view = ReportView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('ReportController', ['$scope', '$modal', ReportController]);

    return ReportController;
});