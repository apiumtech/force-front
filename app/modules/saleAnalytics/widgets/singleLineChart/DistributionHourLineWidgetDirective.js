/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetController'
], function(app, DistributionHourLineWidgetController){

    function DistributionHourLineWidgetDirective() {
        return {
            restrict: "EAC",
            controller: DistributionHourLineWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/singleLineChart/distributionHourLineWidget.html'
        };
    }

    app.register.directive('distributionHourLineWidget', [DistributionHourLineWidgetDirective]);

    return DistributionHourLineWidgetDirective;
});