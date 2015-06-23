define([
    'app',
    'modules/saleAnalytics/widgets/custom/CustomWidgetView'
], function (app, CustomWidgetView) {
    'use strict';

    function CustomWidgetController($scope, $element, $compile) {
        CustomWidgetController.configureView($scope, $element, $compile);
    }

    CustomWidgetController.configureView = function ($scope, $element, $compile) {
        this.view = CustomWidgetView.newInstance($scope, $element, $compile);
        this.view.show();
    };

    return CustomWidgetController;
});