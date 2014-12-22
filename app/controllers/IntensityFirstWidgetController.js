/**
 * Created by justin on 12/22/14.
 */
app.registerController(function (container) {
    var IntensityFirstWidgetView = container.getView("views/IntensityFirstWidgetView");

    function IntensityFirstWidgetController($scope, $element) {
        this.view = IntensityFirstWidgetView.newInstance($scope, $element).getOrElse(throwException("Cannot instantiate IntensityFirstWidgetView"));
        this.view.show();
    }

    return IntensityFirstWidgetController;
});