define([
    'app',
    'modules/saleAnalytics/reports/previewDialog/PreviewDialogView'
], function (app, PreviewDialogView) {
    'use strict';

    function PreviewDialogController($scope, $modalInstance, report) {
        $scope.report = report;
        console.log("Opening report: ", report);
        PreviewDialogController.configureView($scope, $modalInstance);
    }

    PreviewDialogController.configureView = function ($scope, $modalInstance) {
        this.view = PreviewDialogView.newInstance($scope, $modalInstance);
        this.view.show();
    };

    app.register.controller('PreviewDialogController', ['$scope', '$modalInstance', 'report', PreviewDialogController]);

    return PreviewDialogController;
});