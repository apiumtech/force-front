/**
 * Created by justin on 12/22/14.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetView'
], function (app, GraphChartWidgetView) {
    'use strict';

    function GraphChartWidgetController($scope, $element, $rootScope) {
        GraphChartWidgetController.configureView($scope, $element, $rootScope);
    }

    GraphChartWidgetController.configureView = function ($scope, $element, $rootScope) {
        this.view = GraphChartWidgetView.newInstance($scope, $element, $rootScope);
        this.view.show();
    };


    return GraphChartWidgetController;
});