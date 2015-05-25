define([
    'app',
    'modules/saleAnalytics/conversion/ConversionView',


], function (app, ConversionView) {
    'use strict';

    function ConversionController($scope) {
        ConversionController.configureView($scope);
    }

    ConversionController.configureView = function ($scope) {
        this.view = ConversionView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('ConversionController', ['$scope', ConversionController]);

    return ConversionController;
});