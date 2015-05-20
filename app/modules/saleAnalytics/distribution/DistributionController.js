define([
    'app',
    'modules/saleAnalytics/distribution/DistributionView'
], function (app, DistributionView) {
    'use strict';

    function DistributionController($scope) {
        DistributionController.configureView($scope);
    }

    DistributionController.configureView = function ($scope) {
        this.view = DistributionView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('DistributionController', ['$scope', DistributionController]);

    return DistributionController;
});
