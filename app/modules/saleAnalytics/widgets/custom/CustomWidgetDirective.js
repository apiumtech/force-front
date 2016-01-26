define([
    'app',
    'modules/saleAnalytics/widgets/custom/CustomWidgetController',
    'modules/widgets/WidgetWrapperDirective'
], function (app, CustomWidgetController) {
    'use strict';

    function CustomWidgetDirective($rootScope) {
        return {
            restrict: "EAC",
            controller: CustomWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/custom/customWidget.html?v='+ $rootScope.cacheBuster
        };
    }

    app.register.directive('customWidget', ['$rootScope', CustomWidgetDirective]);

    return CustomWidgetDirective;
});