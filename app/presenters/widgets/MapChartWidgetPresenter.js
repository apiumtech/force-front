/**
 * Created by justin on 1/26/15.
 */

app.registerPresenter(function (container) {
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');

    function MapChartWidgetPresenter(widgetEventChannel) {
        this.widgetEventChannel = widgetEventChannel;
    }

    MapChartWidgetPresenter.prototype = Object.create(Object.prototype, {
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

    MapChartWidgetPresenter.prototype.rebindChannelListener = function () {
        var self = this;
        self.widgetEventChannel.onReloadSignalReceived(function () {
            self._executeLoadWidget();
        });
    };

    MapChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            $model = self.$model;

        $model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    MapChartWidgetPresenter.prototype.showError = function (error) {

    };

    MapChartWidgetPresenter.prototype.show = function (view, model) {
        var self = this;
        self.$view = view;
        self.$model = model;

        self.rebindChannelListener();

        view.event.onReloading = function () {
            model.setFetchEndPoint(view.widget.dataEndpoint);
            model.changeFilterTab(view.selectedFilter);
            view.data = {};
            self._executeLoadWidget();
        };

        view.event.onFilterChanged = function () {
            model.changeFilterTab(view.selectedFilter);
            self.widgetEventChannel.sendReloadSignal();
        };

        view.event.onDateFilterApplied = function (filterValue) {
            model.addDateFilter(filterValue.dateStart, filterValue.dateEnd);
            self.widgetEventChannel.sendReloadSignal();
        };

        view.event.onUsersFilterApplied = function (filterValue) {
            model.addUserFilter(filterValue);
            self.widgetEventChannel.sendReloadSignal();
        };
    };

    MapChartWidgetPresenter.newInstance = function (widgetEventChannel) {
        var _widgetEventChannel = widgetEventChannel || WidgetEventBus.newInstance("UnknownChart");
        return new MapChartWidgetPresenter(_widgetEventChannel);
    };

    return MapChartWidgetPresenter;
});