/**
 * Created by justin on 12/22/14.
 */
app.registerView(function (container) {
    var WidgetBaseView = container.getView("views/WidgetBaseView");
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var GraphWidgetModel = container.getModel('models/GraphWidgetModel');
    var GraphWidgetPresenter = container.getPresenter('presenters/GraphWidgetPresenter');

    function GraphWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        scope._widget = null;
        var self = this;
        self.configureEvents();
    }

    GraphWidgetView.prototype = Object.create(WidgetBaseView.prototype, {});

    GraphWidgetView.prototype.configureEvents = function () {
        var self = this;
        self.isAssigned = false;

        self.fn.assignWidget = function (outerScopeWidget) {
            self.widget = outerScopeWidget;
            self.event.onReloadWidgetStart();
        };
    };

    GraphWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        self.data = data.data;
        self.event.onReloadWidgetDone();
    };

    GraphWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || GraphWidgetModel.newInstance().getOrElse(throwInstantiateException(GraphWidgetModel));
        var presenter = $presenter || GraphWidgetPresenter.newInstance().getOrElse(throwInstantiateException(GraphWidgetPresenter));

        var view = new GraphWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return GraphWidgetView;
});