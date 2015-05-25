/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetController'
], function (app, GraphChartWidgetController) {
    'use strict';

    function GraphChartWidgetDirective() {
        return {
            restrict: "EAC",
            controller: GraphChartWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/graphChart/graph.html'
        };
    }

    app.register.directive('graphChartWidget', [GraphChartWidgetDirective]);

    return GraphChartWidgetDirective;
});