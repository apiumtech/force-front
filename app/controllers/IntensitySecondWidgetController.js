/**
 * Created by justin on 12/22/14.
 */
app.registerController(function (container) {
    var IntensitySecondWidgetView = container.getView("views/IntensitySecondWidgetView");

    function IntensitySecondWidgetController($scope, $element) {
        this.view = IntensitySecondWidgetView.newInstance($scope, $element).getOrElse(throwException("Cannot instantiate IntensitySecondWidgetView"));
        this.view.show();
    }

    return IntensitySecondWidgetController;
});