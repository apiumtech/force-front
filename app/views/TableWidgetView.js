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

    TableWidgetView.prototype = Object.create(WidgetBaseView.prototype, {
        widget: {
            get: function () {
                return this.$scope._widget;
            },
            set: function (value) {
                this.$scope._widget = value;
                this.presenter.widgetEventChannel = this._getWidgetChannelInstance(value.widgetType + "||" + value.widgetId);
                this.fn.onWidgetAssigned(value);
            }
        }
    });

    TableWidgetView.prototype.configureEvents = function () {
        var self = this;

        self.fn.assignWidget = function (outerScopeWidget) {
            self.widget = outerScopeWidget;
            self.event.onReloadWidgetStart();
        };

        self.fn.onWidgetAssigned = function (value) {
            self.model.widgetId = value.widgetId;
            self.model.order = value.order;
            self.model.column = value.column;
        };
    };

    TableWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        self.data = data.data;
        self.event.onReloadWidgetDone();
    };

    TableWidgetView.prototype._getWidgetChannelInstance = function (widgetName) {
        return WidgetEventBus.newInstance(widgetName).getOrElse(throwException("Cannot instantiate WidgetEventBus"));
    };

    TableWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || TableWidgetModel.newInstance().getOrElse(throwException("Cannot instantiate TableWidgetModel"));
        var presenter = $presenter || TableWidgetPresenter.newInstance().getOrElse(throwException("Cannot instantiate TableWidgetPresenter"));

        var view = new TableWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return TableWidgetView;
});