/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/pieChart/distributionSegmentPieWidget/DistributionSegmentPieWidgetController'
], function(app, SegmentPieWidgetController){

    function DistributionSegmentPieWidgetDirective() {
        return {
            restrict: "EAC",
            controller: SegmentPieWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/pieChart/distributionPieWidget.html'
        };
    }

    app.register.directive('distributionSegmentPieWidget', [DistributionSegmentPieWidgetDirective]);

    return DistributionSegmentPieWidgetDirective;
});