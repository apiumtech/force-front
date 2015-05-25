/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetController',

    'modules/widgets/WidgetWrapperDirective'
], function (app, TableChartWidgetController) {
    'use strict';

    function IntensityRankingWidgetDirective() {
        return {
            restrict: "EAC",
            controller: TableChartWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/tableChart/tableChartWidget.html'
        };
    }

    app.register.directive('tableChartWidget', [IntensityRankingWidgetDirective]);

    return IntensityRankingWidgetDirective;
});