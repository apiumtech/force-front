/**
 * Created by justin on 12/18/14.
 */
app.registerController(function (container) {
    var WidgetWrapperView = container.getView('views/directives/WidgetWrapperView');

    function WidgetWrapperController($scope, $element) {
        this.view = Some(new WidgetWrapperView($scope, $element)).getOrElse(throwException("Cannot instantiate WidgetWrapperView"));
    }

    return WidgetWrapperController;
});