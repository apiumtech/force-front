/**
 * Created by justin on 12/22/14.
 */
define([], function(){
    var SegmentPieChartWidgetView = container.getView("views/widgets/SegmentPieChartWidgetView");

    function DistributionSegmentPieWidgetController($scope, $element) {
        DistributionSegmentPieWidgetController.configureView($scope, $element);
    }

    DistributionSegmentPieWidgetController.configureView = function ($scope, $element) {
        this.view = SegmentPieChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return DistributionSegmentPieWidgetController;
});