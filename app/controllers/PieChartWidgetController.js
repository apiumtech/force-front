/**
 * Created by justin on 12/22/14.
 */
app.registerController(function (container) {
    var PieChartWidgetView = container.getView("views/PieChartWidgetView");

    function PieChartWidgetController($scope, $element) {
        PieChartWidgetController.configureView($scope, $element);
    }

    PieChartWidgetController.configureView = function ($scope, $element) {
        this.view = PieChartWidgetView.newInstance($scope, $element).getOrElse(throwException("Cannot instantiate PieChartWidgetView"));
        this.view.show();
    };

    return PieChartWidgetController;
});