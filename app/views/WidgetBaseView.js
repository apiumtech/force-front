/**
 * Created by justin on 12/22/14.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");

    // TODO: deprecated, removing
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');


    var SalesAnalyticsFilterChannel = container.getService("services/bus/SalesAnalyticsFilterChannel");

    function WidgetBaseView(scope, element, model, presenter) {
        BaseView.call(this, scope, model, presenter);
        this.element = element || {};
        this.filterChannel = SalesAnalyticsFilterChannel.newInstance("WidgetDecoratedPage").getOrElse(throwInstantiateException(SalesAnalyticsFilterChannel));

        this.event.onDateFilterApplied = function (filterValue) {
            throw new Error("NotImplementedException");
        };
        this.event.onUsersFilterApplied = function (filterValue) {
            throw new Error("NotImplementedException");
        };
        this.channelInitialized = false;
        scope.$watch('widget', this.initializeWidgetChannel.bind(this));
    }

    WidgetBaseView.prototype = Object.create(BaseView.prototype, {
        widget: {
            get: function () {
                return this.$scope.widget;
            },
            set: function (value) {
                this.$scope.widget = value;
                this.model.widgetId = value.widgetId;
                this.model.order = value.order;
                this.model.column = value.column;
            }
        }
    });

    WidgetBaseView.prototype.initializeWidgetChannel = function () {
        if (this.widget && !this.channelInitialized) {
            this.channelInitialized = true;
            this.presenter.widgetEventChannel = this._getWidgetChannelInstance(this.widget.widgetType + "||" + this.widget.widgetId);
        }
    };

    WidgetBaseView.prototype.sendReloadCommandToChannel = function () {

    };

    WidgetBaseView.prototype.__show = BaseView.prototype.show;
    WidgetBaseView.prototype.show = function () {
        this.__show.call(this);

        var self = this;

        self.filterChannel.onDateFilterApplySignalReceived(function (filterValue) {
            self.event.onDateFilterApplied(filterValue);
        });

        self.filterChannel.onUserFilterApplySignalReceived(function (filterValue) {
            self.event.onUsersFilterApplied(filterValue);
        });
    };

    WidgetBaseView.prototype._getWidgetChannelInstance = function (widgetName) {
        return WidgetEventBus.newInstance(widgetName).getOrElse(throwInstantiateException(WidgetEventBus));
    };

    WidgetBaseView.prototype.onReloadWidgetError = function (error) {
        var self = this;
        var errorMessage;

        switch (error.readyState) {
            case 0:
                errorMessage = "Error while requesting data. Cannot open connection to the server. Please check internet setting";
                break;
            case 4:
                errorMessage = "Error while requesting data. Error: " + error.responseText || error.statusText;
                break;

            default:
                var err = "";
                if (error instanceof Error)
                    err = error.message;
                errorMessage = "Error while requesting data. " + err;
                break;
        }
        self.event.onReloadWidgetDone(errorMessage);
    };

    return WidgetBaseView;
});