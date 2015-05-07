/**
 * Created by justin on 12/22/14.
 */

app.registerPresenter(function (container) {
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var Configuration  = container.getService('Configuration');

    var widgetName = "intensityWidgetA";

    function GraphWidgetPresenter(widgetEventChannel) {
        this.widgetEventChannel = widgetEventChannel;
    }

    GraphWidgetPresenter.prototype = Object.create(Object.prototype, {
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

    GraphWidgetPresenter.prototype.rebindChannelListener = function () {
        var self = this;
        self.widgetEventChannel.onReloadSignalReceived(function () {
            self._executeLoadWidget();
        });
    };

    GraphWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            $model = self.$model;

        $model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    GraphWidgetPresenter.prototype.showError = function (error) {

    };

    GraphWidgetPresenter.prototype.show = function (view, model) {
        var self = this;
        self.$view = view;
        self.$model = model;

        self.rebindChannelListener();

        view.event.onReloadWidgetStart = function () {
            view.data = {};
            self._executeLoadWidget();
        };

        view.event.onFilterChanged = function () {
            model.changeQueryFilter(view.$scope.selectedFilter);
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

        view.event.onFilterRangeChanged = function () {
            model.addQuery('grouping', view.$scope.selectedRangeOption);
            self.widgetEventChannel.sendReloadSignal();
        };

        view.event.onReloadWidgetDone = function (errMsg) {
            // init the value when widget loaded
            model.changeQueryFilter(view.$scope.selectedFilter);
            model.addQuery('grouping', view.$scope.selectedRangeOption);
            self.widgetEventChannel.sendReloadCompleteSignal(errMsg);
        };
    };

    GraphWidgetPresenter.newInstance = function (widgetEventChannel) {
        var _widgetEventChannel = widgetEventChannel || WidgetEventBus.newInstance(widgetName).getOrElse(throwException("Cannot instantiate WidgetEventBus"));
        return Some(new GraphWidgetPresenter(_widgetEventChannel));
    };

    return GraphWidgetPresenter;
});