/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/intensity/graphChart/IntensityGraphWidgetController'
], function (app, IntensityGraphWidgetController) {
    'use strict';

    function IntensityGraphWidgetDirective() {
        return {
            restrict: "EAC",
            controller: IntensityGraphWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/intensity/graphChart/intensityGraphWidget.html'
        };
    }

    app.register.directive('intensityGraphWidget', [IntensityGraphWidgetDirective]);

    return IntensityGraphWidgetDirective;
});