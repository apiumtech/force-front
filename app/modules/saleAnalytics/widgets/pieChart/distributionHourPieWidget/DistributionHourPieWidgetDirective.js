/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/pieChart/distributionHourPieWidget/DistributionHourPieWidgetController'
], function (app, HourPieWidgetController) {

    function DistributionHourPieWidgetDirective() {
        return {
            restrict: "EAC",
            controller: HourPieWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/pieChart/distributionPieWidget.html'
        };
    }

    app.register.directive('distributionHourPieWidget', [DistributionHourPieWidgetDirective]);

    return DistributionHourPieWidgetDirective;
});