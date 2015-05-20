/**
 * Created by justin on 12/22/14.
 */
define([
    'app',
    'modules/saleAnalytics/intensity/graphChart/GraphWidgetView'
], function (app, GraphWidgetView) {
    'use strict';

    function IntensityGraphWidgetController($scope, $element) {
        IntensityGraphWidgetController.configureView($scope, $element);
    }

    IntensityGraphWidgetController.configureView = function ($scope, $element) {
        this.view = GraphWidgetView.newInstance($scope, $element);
        this.view.show();
    };


    return IntensityGraphWidgetController;
});