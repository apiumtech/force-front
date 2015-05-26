define([
    'app',
    'modules/saleAnalytics/reports/reportItem/ReportItemView'
], function (app, ReportItemView) {
    'use strict';

    function ReportItemController($scope, $element) {
        ReportItemController.configureView($scope, $element);
    }

    ReportItemController.configureView = function ($scope, $element) {
        this.view = ReportItemView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('ReportItemController', ['$scope', '$element', ReportItemController]);

    return ReportItemController;
});