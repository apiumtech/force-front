/**
 * Created by justin on 02/11/15.
 */
app.registerController(function (container) {
    var MapChartWidgetView = container.getView("views/MapChartWidgetView");

    function DistributionGeographicalWidgetController($scope, $element) {
        DistributionGeographicalWidgetController.configureView($scope, $element);
    }

    DistributionGeographicalWidgetController.configureView = function ($scope, $element) {
        this.view = MapChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return DistributionGeographicalWidgetController;
});