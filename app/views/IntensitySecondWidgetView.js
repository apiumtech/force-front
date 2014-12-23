/**
 * Created by justin on 12/22/14.
 */
app.registerView(function (container) {
    var WidgetBaseView = container.getView("views/WidgetBaseView");
    var IntensitySecondWidgetModel = container.getModel('models/IntensitySecondWidgetModel');
    var IntensitySecondWidgetPresenter = container.getPresenter('presenters/IntensitySecondWidgetPresenter');

    function IntensitySecondWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
    }

    IntensitySecondWidgetView.prototype = Object.create(WidgetBaseView.prototype);

    IntensitySecondWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || IntensitySecondWidgetModel.newInstance().getOrElse(throwException("Cannot instantiate IntensitySecondWidgetModel"));
        var presenter = $presenter || IntensitySecondWidgetPresenter.newInstance().getOrElse(throwException("Cannot instantiate IntensitySecondWidgetPresenter"));

        var view = new IntensitySecondWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return IntensitySecondWidgetView;
});