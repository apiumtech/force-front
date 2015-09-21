/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetController'
], function (app, BarChartWidgetController) {

    function BarChartWidgetDirective() {
        return {
            restrict: "EAC",
            controller: BarChartWidgetController,
            scope: {
                widget: "=",
                horizontal: "=", // true|false
                stacked: "=" // true|false
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/barChart/bar.html'
        };
    }

    app.register.directive('barChartWidget', [BarChartWidgetDirective]);

    return BarChartWidgetDirective;
});