define([
    'app',
    'modules/saleAnalytics/widgetAdministration/WidgetAdministrationView'
], function (app, WidgetAdministrationView) {
    'use strict';

    function WidgetAdministrationController($scope) {
        WidgetAdministrationController.configureView($scope);
    }

    WidgetAdministrationController.configureView = function ($scope) {
        this.view = WidgetAdministrationView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('WidgetAdministrationController', ['$scope', WidgetAdministrationController]);

    return WidgetAdministrationController;
});