/**
 * Created by justin on 1/26/15.
 */

define([], function(){
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

    MapChartWidgetPresenter.newInstance = function (widgetEventChannel) {
        var _widgetEventChannel = widgetEventChannel || WidgetEventBus.newInstance("UnknownChart");
        return new MapChartWidgetPresenter(_widgetEventChannel);
    };

    return MapChartWidgetPresenter;
});