define([
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetView'
], function (PieChartWidgetView) {
    'use strict';

    function PieWidgetController($scope, $element) {
        PieWidgetController.configureView($scope, $element);
    }

    PieWidgetController.configureView = function ($scope, $element) {
        this.view = PieChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return PieWidgetController;
});