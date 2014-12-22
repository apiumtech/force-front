/**
 * Created by justin on 12/18/14.
 */
app.registerController(function (container) {
    var WidgetWrapperView = container.getView('views/WidgetWrapperView');

    function WidgetWrapperController($scope, $element) {
        this.view = WidgetWrapperView.newInstance($scope, $element).getOrElse(throwException("Cannot instantiate WidgetWrapperView"));
    }

    return WidgetWrapperController;
});