/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetController'
], function(app, ScatterChartWidgetController){

    function ScatterChartWidgetDirective() {
        return {
            restrict: "EAC",
            controller: ScatterChartWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/scatterChart/scatter.html'
        };
    }

    app.register.directive('scatterChartWidget', [ScatterChartWidgetDirective]);

    return ScatterChartWidgetDirective;
});