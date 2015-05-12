/**
 * Created by justin on 5/9/15.
 */
app.registerDirective(function (container) {
    var SegmentPieWidgetController = container.getController("controllers/widgets/DistributionSegmentPieWidgetController");

    function DistributionSegmentPieWidgetDirective() {
        return {
            restrict: "EAC",
            controller: SegmentPieWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'templates/widgets/distributionSegmentPieWidget.html'
        };
    }

    return DistributionSegmentPieWidgetDirective;
});