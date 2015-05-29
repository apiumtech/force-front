/**
 * Created by justin on 1/28/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetView'
], function (app, BarChartWidgetView) {
    'use strict';

    function BarChartWidgetController($scope, $element) {
        BarChartWidgetController.configureView($scope, $element);
    }

    BarChartWidgetController.configureView = function ($scope, $element) {
        this.view = BarChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('BarChartWidgetController', ['$scope', '$element', BarChartWidgetController]);

    return BarChartWidgetController;
});