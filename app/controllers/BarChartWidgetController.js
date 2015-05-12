/**
 * Created by justin on 1/28/15.
 */
app.registerController(function (container) {
    var BarChartWidgetView = container.getView("views/BarChartWidgetView");

    function BarChartWidgetController($scope, $element) {
        BarChartWidgetController.configureView($scope, $element);
    }

    BarChartWidgetController.configureView = function ($scope, $element) {
        this.view = BarChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return BarChartWidgetController;
});