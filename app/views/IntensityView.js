/**
 * Created by justin on 12/17/14.
 */

app.registerView(function (container) {
    var WidgetDecoratedPageView = container.getView('views/WidgetDecoratedPageView');

    var IntensityPresenter = container.getPresenter('presenters/IntensityPresenter');
    var IntensityModel = container.getModel('models/IntensityModel');

    function IntensityView($scope, $model, $presenter) {
        WidgetDecoratedPageView.call(this, $scope, $model, $presenter);
        var self = this;

        self.fn.loadWidgets = function () {
            self.event.onLoaded();
        };
    }

    IntensityView.prototype = Object.create(WidgetDecoratedPageView.prototype, {});

    IntensityView.prototype.__show = WidgetDecoratedPageView.prototype.show;
    IntensityView.prototype.show = function () {
        this.__show.call(this);
        this.fn.loadWidgets();
    };

    IntensityView.prototype._rearrangeWidgetsList = function (widgetsData) {
        widgetsData.sort(function (widgetA, widgetB) {
            return widgetA.order - widgetB.order;
        });
    };

    IntensityView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || IntensityModel.newInstance().getOrElse(throwInstantiateException(IntensityModel));
        var presenter = $presenter || IntensityPresenter.newInstance().getOrElse(throwInstantiateException(IntensityPresenter));

        var view = new IntensityView($scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return IntensityView;
});
