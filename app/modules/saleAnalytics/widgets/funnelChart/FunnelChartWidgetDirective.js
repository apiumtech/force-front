define([
    'app',
    'modules/saleAnalytics/widgets/funnelChart/FunnelChartWidgetController'
], function (app, FunnelChartWidgetController) {
    'use strict';

    function FunnelChartWidgetDirective($rootScope) {
        return {
            restrict: "EAC",
            controller: FunnelChartWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/funnelChart/funnel.html?v='+ $rootScope.cacheBuster
        };
    }

    app.register.directive('funnelChartWidget', ['$rootScope', FunnelChartWidgetDirective]);

    return FunnelChartWidgetDirective;
});