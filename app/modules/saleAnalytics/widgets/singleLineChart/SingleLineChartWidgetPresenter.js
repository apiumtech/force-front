/**
 * Created by justin on 2/2/15.
 */

define([], function(){
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var widgetName = "LineChart";

    function SingleLineChartWidgetPresenter(widgetEventChannel) {
        this.widgetEventChannel = widgetEventChannel;
    }

    SingleLineChartWidgetPresenter.prototype = Object.create(Object.prototype, {
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

    SingleLineChartWidgetPresenter.prototype.rebindChannelListener = function () {
        var self = this;
        self.widgetEventChannel.onReloadSignalReceived(function () {
            self._executeLoadWidget();
        });
    };

    SingleLineChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            $model = self.$model;

        $model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    SingleLineChartWidgetPresenter.prototype.showError = function (error) {

    };

    SingleLineChartWidgetPresenter.prototype.show = function (view, model) {
        var self = this;
        self.$view = view;
        self.$model = model;

        self.rebindChannelListener();

        view.event.onReloading = function () {
            model.setFetchEndPoint(view.widget.dataEndpoint);
            view.data = {};
            self._executeLoadWidget();
        };

        view.event.onFilterChanged = function () {
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

    SingleLineChartWidgetPresenter.newInstance = function (widgetEventChannel) {
        var _widgetEventChannel = widgetEventChannel || WidgetEventBus.newInstance(widgetName);
        return new SingleLineChartWidgetPresenter(_widgetEventChannel);
    };

    return SingleLineChartWidgetPresenter;
});