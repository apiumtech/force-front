/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetController'
], function (app, BarChartWidgetController) {

    function BarChartWidgetDirective($rootScope) {
        return {
            restrict: "EAC",
            controller: BarChartWidgetController,
            scope: {
                widget: "=",
                horizontal: "=", // true|false
                stacked: "=", // true|false
                legend: "=", // legend object
                chartArea: "=" // chartArea object
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/barChart/bar.html?v='+ $rootScope.cacheBuster
        };
    }

    app.register.directive('barChartWidget', ['$rootScope', BarChartWidgetDirective]);

    return BarChartWidgetDirective;
});