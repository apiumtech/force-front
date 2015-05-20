/**
 * Created by justin on 12/22/14.
 */
define([
    'app',
    'modules/saleAnalytics/intensity/rankingChart/TableWidgetView'
], function (app, TableWidgetView) {
    'use strict';

    function IntensityRankingWidgetController($scope, $element) {
        IntensityRankingWidgetController.configureView($scope, $element);
    }

    IntensityRankingWidgetController.configureView = function ($scope, $element) {
        this.view = TableWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return IntensityRankingWidgetController;
});