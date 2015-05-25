/**
 * Created by justin on 12/22/14.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetView'
], function (app, TableWidgetView) {
    'use strict';

    function TableChartWidgetController($scope, $element) {
        TableChartWidgetController.configureView($scope, $element);
    }

    TableChartWidgetController.configureView = function ($scope, $element) {
        this.view = TableWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return TableChartWidgetController;
});