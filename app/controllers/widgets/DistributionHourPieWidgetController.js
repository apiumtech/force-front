/**
 * Created by justin on 12/22/14.
 */
app.registerController(function (container) {
    var HourPieChartWidgetView = container.getView("views/HourPieChartWidgetView");

    function HourPieChartWidgetController($scope, $element) {
        HourPieChartWidgetController.configureView($scope, $element);
    }

    HourPieChartWidgetController.configureView = function ($scope, $element) {
        this.view = HourPieChartWidgetView.newInstance($scope, $element).getOrElse(throwInstantiateException(HourPieChartWidgetView));
        this.view.show();
    };

    return HourPieChartWidgetController;
});