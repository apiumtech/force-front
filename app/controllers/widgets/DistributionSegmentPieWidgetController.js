/**
 * Created by justin on 12/22/14.
 */
app.registerController(function (container) {
    var SegmentPieChartWidgetView = container.getView("views/SegmentPieChartWidgetView");

    function SegmentPieChartWidgetController($scope, $element) {
        SegmentPieChartWidgetController.configureView($scope, $element);
    }

    SegmentPieChartWidgetController.configureView = function ($scope, $element) {
        this.view = SegmentPieChartWidgetView.newInstance($scope, $element).getOrElse(throwInstantiateException(SegmentPieChartWidgetView));
        this.view.show();
    };

    return SegmentPieChartWidgetController;
});