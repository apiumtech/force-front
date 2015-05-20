/**
 * Created by justin on 12/17/14.
 */
define([
    'app',
    'modules/saleAnalytics/intensity/IntensityView'
], function (app, IntensityView) {
    'use strict';

    function IntensityController($scope) {
        IntensityController.configureView($scope);
    }

    IntensityController.configureView = function ($scope) {
        this.view = IntensityView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('IntensityController', ['$scope', IntensityController]);

    return IntensityController;
});
