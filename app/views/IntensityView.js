/**
 * Created by justin on 12/17/14.
 */

app.registerView(function (container) {
    var WidgetDecoratedPageView = container.getView('views/WidgetDecoratedPageView');

    var IntensityPresenter = container.getPresenter('presenters/IntensityPresenter');
    var IntensityModel = container.getModel('models/IntensityModel');

    function IntensityView($scope, $model, $presenter) {
        WidgetDecoratedPageView.call(this, $scope, $model, $presenter);
    }

    IntensityView.prototype = Object.create(WidgetDecoratedPageView.prototype, {});

    IntensityView.prototype.__show = WidgetDecoratedPageView.prototype.show;
    IntensityView.prototype.show = function () {
        this.__show.call(this);
        this.event.onLoaded();
    };

    IntensityView.prototype.updateWidgetIndex = function (movingElement, widget) {
        var self = this;

        self.event.onWidgetMoved(widget, self.getElementIndex(movingElement.item));
    };

    IntensityView.prototype.onWidgetsUpdated = function (data) {

    };

    IntensityView.prototype.onWidgetsUpdatedFail = function (error) {
        this.showError(error);
    };

    IntensityView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || IntensityModel.newInstance().getOrElse(throwInstantiateException(IntensityModel));
        var presenter = $presenter || IntensityPresenter.newInstance().getOrElse(throwInstantiateException(IntensityPresenter));

        var view = new IntensityView($scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return IntensityView;
});
