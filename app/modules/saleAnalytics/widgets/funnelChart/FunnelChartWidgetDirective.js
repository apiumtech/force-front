define([
    'app',
    'modules/saleAnalytics/widgets/funnelChart/FunnelChartWidgetController'
], function (app, FunnelChartWidgetController) {

    function FunnelChartWidgetDirective() {
        return {
            restrict: "EAC",
            controller: FunnelChartWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/funnelChart/funnel.html'
        };
    }

    app.register.directive('funnelChartWidget', [FunnelChartWidgetDirective]);

    return FunnelChartWidgetDirective;
});