/**
 * Created by justin on 12/17/14.
 */

app.registerView(function (container) {
    var WidgetDecoratedPageView = container.getView('views/WidgetDecoratedPageView');

    var DistributionPresenter = container.getPresenter('presenters/DistributionPresenter');
    var DistributionModel = container.getModel('models/DistributionModel');

    function DistributionView($scope, $model, $presenter) {
        WidgetDecoratedPageView.call(this, $scope, $model, $presenter);
        var self = this;

        self.fn.loadWidgets = function () {
            self.event.onLoaded();
        };
    }

    DistributionView.prototype = Object.create(WidgetDecoratedPageView.prototype, {});

    DistributionView.prototype.__show = WidgetDecoratedPageView.prototype.show;
    DistributionView.prototype.show = function () {
        this.__show.call(this);
        this.fn.loadWidgets();
    };

    DistributionView.prototype._rearrangeWidgetsList = function (widgetsData) {

    };

    DistributionView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || DistributionModel.newInstance().getOrElse(throwInstantiateException(DistributionModel));
        var presenter = $presenter || DistributionPresenter.newInstance().getOrElse(throwInstantiateException(DistributionPresenter));

        var view = new DistributionView($scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return DistributionView;
});
