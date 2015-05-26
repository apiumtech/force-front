define([
    'app',
    'modules/saleAnalytics/reports/searchReport/SearchReportView'
], function (app, SearchReportView) {
    'use strict';

    function SearchReportController($scope) {
        SearchReportController.configureView($scope);
    }

    SearchReportController.configureView = function ($scope) {
        this.view = SearchReportView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('SearchReportController', ['$scope', SearchReportController]);


    return SearchReportController;
});