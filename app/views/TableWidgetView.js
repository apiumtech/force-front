/**
 * Created by justin on 12/22/14.
 */
app.registerView(function (container) {
    var WidgetBaseView = container.getView("views/WidgetBaseView");
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var TableWidgetModel = container.getModel('models/TableWidgetModel');
    var TableWidgetPresenter = container.getPresenter('presenters/TableWidgetPresenter');

    function TableWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        scope._widget = null;
        var self = this;
        self.configureEvents();
    }

    TableWidgetView.prototype = Object.create(WidgetBaseView.prototype, {});

    TableWidgetView.prototype.configureEvents = function () {
        var self = this;

        self.fn.assignWidget = function (outerScopeWidget) {
            self.widget = outerScopeWidget;
            self.event.onReloadWidgetStart();
        };
    };

    TableWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        self.data = data.data;
        self.event.onReloadWidgetDone();
    };

    TableWidgetView.prototype.onMoveWidgetSuccess = function (data) {
        alert("Widget moved to new position");
    };

    TableWidgetView.prototype.onMoveWidgetError = function (error) {
        this.showError(error);
    };

    TableWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || TableWidgetModel.newInstance().getOrElse(throwInstantiateException(TableWidgetModel));
        var presenter = $presenter || TableWidgetPresenter.newInstance().getOrElse(throwInstantiateException(TableWidgetPresenter));

        var view = new TableWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return TableWidgetView;
});