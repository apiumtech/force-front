/**
 * Created by justin on 12/18/14.
 */
app.registerController(function (container) {
    var WidgetWrapperView = container.getView('views/directives/WidgetWrapperView');

    function WidgetController($scope, $element) {
        this.view = Some(new WidgetWrapperView($scope, $element)).getOrElse(throwException("Cannot instantiate WidgetWrapperView"));
    }

    return WidgetController;
});