/**
 * Created by justin on 12/17/14.
 */

app.registerView(function (container) {
    var WidgetDecoratedPageView = container.getView('views/WidgetDecoratedPageView');

    var ConversionPresenter = container.getPresenter('presenters/ConversionPresenter');
    var ConversionModel = container.getModel('models/ConversionModel');

    function ConversionView($scope, $model, $presenter) {
        WidgetDecoratedPageView.call(this, $scope, $model, $presenter);
        var self = this;

        self.fn.loadWidgets = function () {
            self.event.onLoaded();
        };
    }

    ConversionView.prototype = Object.create(WidgetDecoratedPageView.prototype, {});

    ConversionView.prototype.__show = WidgetDecoratedPageView.prototype.show;
    ConversionView.prototype.show = function () {
        this.__show.call(this);
        this.fn.loadWidgets();
    };

    ConversionView.prototype._rearrangeWidgetsList = function (widgetsData) {

    };

    ConversionView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || ConversionModel.newInstance().getOrElse(throwInstantiateException(ConversionModel));
        var presenter = $presenter || ConversionPresenter.newInstance().getOrElse(throwInstantiateException(ConversionPresenter));

        var view = new ConversionView($scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ConversionView;
});
