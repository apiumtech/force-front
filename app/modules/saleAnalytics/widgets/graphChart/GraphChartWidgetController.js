/**
 * Created by justin on 12/22/14.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetView'
], function (app, GraphChartWidgetView) {
    'use strict';

    function GraphChartWidgetController($scope, $element) {
        GraphChartWidgetController.configureView($scope, $element);
    }

    GraphChartWidgetController.configureView = function ($scope, $element) {
        this.view = GraphChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };


    return GraphChartWidgetController;
});