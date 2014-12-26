/**
 * Created by justin on 12/22/14.
 */
app.registerController(function (container) {
    var GraphWidgetView = container.getView("views/GraphWidgetView");

    function GraphWidgetController($scope, $element) {
        GraphWidgetController.configureView($scope, $element);
    }

    GraphWidgetController.configureView = function ($scope, $element) {
        this.view = GraphWidgetView.newInstance($scope, $element).getOrElse(throwException("Cannot instantiate GraphWidgetView"));
        this.view.show();
    };

    return GraphWidgetController;
});