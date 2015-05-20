/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/intensity/rankingChart/IntensityRankingWidgetController',

    'modules/widgets/WidgetWrapperDirective'
], function (app, IntensityRankingWidgetController) {
    'use strict';

    function IntensityRankingWidgetDirective() {
        return {
            restrict: "EAC",
            controller: IntensityRankingWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/intensity/rankingChart/intensityRankingWidget.html'
        };
    }

    app.register.directive('intensityRankingWidget', [IntensityRankingWidgetDirective]);

    return IntensityRankingWidgetDirective;
});