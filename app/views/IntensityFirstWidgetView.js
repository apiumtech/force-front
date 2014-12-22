/**
 * Created by justin on 12/22/14.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var IntensityFirstWidgetModel = container.getModel('models/IntensityFirstWidgetModel');
    var IntensityFirstWidgetPresenter = container.getPresenter('presenters/IntensityFirstWidgetPresenter');

    function IntensityFirstWidgetView(scope, element, model, presenter) {
        BaseView.call(this, scope, model, presenter);
        this.element = element;
    }

    IntensityFirstWidgetView.prototype = Object.create(BaseView.prototype);

    IntensityFirstWidgetView.prototype.__show = BaseView.prototype.show;
    IntensityFirstWidgetView.prototype.show = function () {
        this.__show();
        this.event.onReloadWidgetRequested();
    };

    IntensityFirstWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        console.log(data);
    };

    IntensityFirstWidgetView.prototype.onReloadWidgetError = function (error) {
        this.showError(error);
    };

    IntensityFirstWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var element = $element || {};
        var model = $model || IntensityFirstWidgetModel.newInstance().getOrElse(throwException("Cannot instantiate IntensityFirstWidgetModel"));
        var presenter = $presenter || IntensityFirstWidgetPresenter.newInstance().getOrElse(throwException("Cannot instantiate IntensityFirstWidgetPresenter"));

        var view = new IntensityFirstWidgetView(scope, element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return IntensityFirstWidgetView;
});