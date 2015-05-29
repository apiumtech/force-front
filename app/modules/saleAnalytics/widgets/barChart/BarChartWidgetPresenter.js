/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/eventBus/WidgetEventBus',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetModel'
], function (WidgetEventBus, BarChartWidgetModel) {

    var widgetName = "intensityWidgetA";

    function BarChartWidgetPresenter(model, widgetEventChannel) {
        this._widgetEventChannel = widgetEventChannel || WidgetEventBus.newInstance(widgetName);
        this.model = model || new BarChartWidgetModel();
    }

    BarChartWidgetPresenter.prototype = Object.create(Object.prototype, {
        widgetEventChannel: {
            get: function () {
                return this._widgetEventChannel;
            },
            set: function (value) {
                this._widgetEventChannel = value;
                this.rebindChannelListener();
            }
        }
    });

    BarChartWidgetPresenter.prototype.rebindChannelListener = function () {
        var self = this;
        self.widgetEventChannel.onReloadSignalReceived(function () {
            self._executeLoadWidget();
        });
    };

    BarChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this;
        var $view = self.$view;
        var model = self.model;

        model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    BarChartWidgetPresenter.prototype.showError = function (error) {

    };

    BarChartWidgetPresenter.prototype.show = function (view, model) {
        var self = this;
        model = this.model;
        self.$view = view;
        self.$model = model;

        self.rebindChannelListener();

        view.event.onReloading = function () {
            model.setFetchEndPoint(view.widget.dataEndpoint);
            view.data = {};
            self._executeLoadWidget();
        };

        view.event.onTabChanged = function () {
            model.changeQueryFilter(view.selectedFilter);
            view.sendReloadCommandToChannel();
        };

        view.event.onDateFilterApplied = function (filterValue) {
            model.addDateFilter(filterValue.dateStart, filterValue.dateEnd);
            view.sendReloadCommandToChannel();
        };

        view.event.onUsersFilterApplied = function (filterValue) {
            model.addUserFilter(filterValue);
            view.sendReloadCommandToChannel();
        };

    };

    BarChartWidgetPresenter.newInstance = function (model, widgetEventChannel) {
        var _widgetEventChannel = widgetEventChannel || WidgetEventBus.newInstance(widgetName);
        return new BarChartWidgetPresenter(model, _widgetEventChannel);
    };

    return BarChartWidgetPresenter;
});