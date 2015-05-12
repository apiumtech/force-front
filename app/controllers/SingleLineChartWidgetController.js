/**
 * Created by justin on 2/2/15.
 */
app.registerController(function (container) {
    var SingleLineChartWidgetView = container.getView("views/SingleLineChartWidgetView");

    function SingleLineChartWidgetController($scope, $element) {
        SingleLineChartWidgetController.configureView($scope, $element);
    }

    SingleLineChartWidgetController.configureView = function ($scope, $element) {
        this.view = SingleLineChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return SingleLineChartWidgetController;
});