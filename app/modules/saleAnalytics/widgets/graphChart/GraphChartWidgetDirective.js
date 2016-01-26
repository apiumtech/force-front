/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetController'
], function (app, GraphChartWidgetController) {
    'use strict';

    function GraphChartWidgetDirective($rootScope) {
        return {
            restrict: "EAC",
            controller: GraphChartWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/graphChart/graph.html?v='+ $rootScope.cacheBuster
        };
    }

    app.register.directive('graphChartWidget', ['$rootScope', GraphChartWidgetDirective]);

    return GraphChartWidgetDirective;
});