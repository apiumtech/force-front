/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetController'
], function(app, ScatterChartWidgetController){

    function ScatterChartWidgetDirective($rootScope) {
        return {
            restrict: "EAC",
            controller: ScatterChartWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/scatterChart/scatter.html?v='+ $rootScope.cacheBuster
        };
    }

    app.register.directive('scatterChartWidget', ['$rootScope', ScatterChartWidgetDirective]);

    return ScatterChartWidgetDirective;
});