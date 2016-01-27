/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetController'
], function(app, PieChartWidgetController){

    function PieChartWidgetDirective($rootScope) {
        return {
            restrict: "EAC",
            controller: PieChartWidgetController,
            scope: {
                widget: "=",
                onlyPieChart: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/pieChart/pieWidget.html?v='+ $rootScope.cacheBuster
        };
    }

    app.register.directive('pieChartWidget', ['$rootScope', PieChartWidgetDirective]);

    return PieChartWidgetDirective;
});