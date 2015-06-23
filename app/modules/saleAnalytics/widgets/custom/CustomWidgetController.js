define([
    'app',
    'modules/saleAnalytics/widgets/custom/CustomWidgetView'
], function (app, CustomWidgetView) {
    'use strict';

    function CustomWidgetController($scope, $element) {
        CustomWidgetController.configureView($scope, $element);
    }

    CustomWidgetController.configureView = function ($scope, $element) {
        this.view = CustomWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return CustomWidgetController;
});