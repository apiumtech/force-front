/**
 * Created by justin on 12/22/14.
 */
app.registerController(function (container) {
    var HourPieChartWidgetView = container.getView("views/widgets/HourPieChartWidgetView");

    function DistributionHourPieWidgetController($scope, $element) {
        DistributionHourPieWidgetController.configureView($scope, $element);
    }

    DistributionHourPieWidgetController.configureView = function ($scope, $element) {
        this.view = HourPieChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return DistributionHourPieWidgetController;
});