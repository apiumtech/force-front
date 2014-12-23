/**
 * Created by justin on 12/22/14.
 */
app.registerView(function (container) {
    var WidgetBaseView = container.getView("views/WidgetBaseView");
    var IntensityFirstWidgetModel = container.getModel('models/IntensityFirstWidgetModel');
    var IntensityFirstWidgetPresenter = container.getPresenter('presenters/IntensityFirstWidgetPresenter');

    function IntensityFirstWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
    }

    IntensityFirstWidgetView.prototype = Object.create(WidgetBaseView.prototype);

    IntensityFirstWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || IntensityFirstWidgetModel.newInstance().getOrElse(throwException("Cannot instantiate IntensityFirstWidgetModel"));
        var presenter = $presenter || IntensityFirstWidgetPresenter.newInstance().getOrElse(throwException("Cannot instantiate IntensityFirstWidgetPresenter"));

        var view = new IntensityFirstWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return IntensityFirstWidgetView;
});