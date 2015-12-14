define([
    'app',
    'modules/saleAnalytics/widgets/funnelChart/FunnelChartWidgetView'
], function (app, FunnelChartWidgetView) {
    'use strict';

    function FunnelChartWidgetController($scope, $element) {
        FunnelChartWidgetController.configureView($scope, $element);
    }

    FunnelChartWidgetController.configureView = function ($scope, $element) {
        this.view = FunnelChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return FunnelChartWidgetController;
});