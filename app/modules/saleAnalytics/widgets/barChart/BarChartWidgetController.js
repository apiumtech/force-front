/**
 * Created by justin on 1/28/15.
 */
define([], function(){
    var BarChartWidgetView = container.getView("views/widgets/BarChartWidgetView");

    function BarChartWidgetController($scope, $element) {
        BarChartWidgetController.configureView($scope, $element);
    }

    BarChartWidgetController.configureView = function ($scope, $element) {
        this.view = BarChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return BarChartWidgetController;
});