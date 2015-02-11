/**
 * Created by justin on 02/11/15.
 */
app.registerController(function (container) {
    var MapChartWidgetView = container.getView("views/MapChartWidgetView");

    function MapChartWidgetController($scope, $element) {
        MapChartWidgetController.configureView($scope, $element);
    }

    MapChartWidgetController.configureView = function ($scope, $element) {
        this.view = MapChartWidgetView.newInstance($scope, $element).getOrElse(throwInstantiateException(MapChartWidgetView));
        this.view.show();
    };

    return MapChartWidgetController;
});