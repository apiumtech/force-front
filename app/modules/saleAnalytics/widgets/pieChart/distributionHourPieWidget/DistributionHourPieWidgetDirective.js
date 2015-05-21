/**
 * Created by justin on 5/9/15.
 */
define([
    'modules/saleAnalytics/widgets/pieChart/distributionHourPieWidget/DistributionHourPieWidgetController'
], function(HourPieWidgetController){

    function DistributionHourPieWidgetDirective() {
        return {
            restrict: "EAC",
            controller: HourPieWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'templates/widgets/distributionPieWidget.html'
        };
    }

    app.register.directive('distributionHourPieWidget', [DistributionHourPieWidgetDirective]);

    return DistributionHourPieWidgetDirective;
});