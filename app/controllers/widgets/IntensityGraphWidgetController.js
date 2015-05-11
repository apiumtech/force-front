/**
 * Created by justin on 12/22/14.
 */
app.registerController(function (container) {
    var GraphWidgetView = container.getView("views/GraphWidgetView");

    function IntensityGraphWidgetController($scope, $element) {
        IntensityGraphWidgetController.configureView($scope, $element);
    }

    IntensityGraphWidgetController.configureView = function ($scope, $element) {
        this.view = GraphWidgetView.newInstance($scope, $element).getOrElse(throwInstantiateException(GraphWidgetView));
        this.view.show();
    };

    return IntensityGraphWidgetController;
});