define([
    'app',
    'modules/saleAnalytics/widgets/custom/CustomWidgetController',
    'modules/widgets/WidgetWrapperDirective'
], function (app, CustomWidgetController) {
    'use strict';

    function CustomWidgetDirective() {
        return {
            restrict: "EAC",
            controller: CustomWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/custom/customWidget.html'
        };
    }

    app.register.directive('customWidget', [CustomWidgetDirective]);

    return CustomWidgetDirective;
});