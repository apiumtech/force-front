/**
 * Created by justin on 5/9/15.
 */
define([], function(){
    var SegmentPieWidgetController = container.getController("controllers/widgets/DistributionSegmentPieWidgetController");

    function DistributionSegmentPieWidgetDirective() {
        return {
            restrict: "EAC",
            controller: SegmentPieWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'templates/widgets/distributionPieWidget.html'
        };
    }

    return DistributionSegmentPieWidgetDirective;
});