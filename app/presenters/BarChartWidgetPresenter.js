/**
 * Created by justin on 1/26/15.
 */

app.registerPresenter(function (container) {
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var widgetName = "intensityWidgetA";

    function BarChartWidgetPresenter(widgetEventChannel) {
        this.widgetEventChannel = widgetEventChannel;
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

        self.widgetEventChannel.onMoveSignalReceived(function (oldPosition, newPosition, moveEvent) {
            self._executeMoveWidget(oldPosition, newPosition, moveEvent);
        });
    };

    BarChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            $model = self.$model;

        $model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    BarChartWidgetPresenter.prototype._executeMoveWidget = function (oldPosition, newPosition, moveEvent) {
        var self = this,
            $view = self.$view,
            $model = self.$model,
            $moveEvent = moveEvent;

        $model.moveWidget(oldPosition, newPosition)
            .then($view.onMoveWidgetSuccess.bind($view), $view.onMoveWidgetError.bind($view));
    };

    BarChartWidgetPresenter.prototype.showError = function (error) {

    };

    BarChartWidgetPresenter.prototype.show = function (view, model) {
        var self = this;
        self.$view = view;
        self.$model = model;

        self.rebindChannelListener();

        view.event.onReloadWidgetStart = function () {
            model.setFetchEndPoint(view.widget.dataEndpoint);
            view.data = {};
            self._executeLoadWidget();
        };

        view.event.onTabChanged = function () {
            model.changeFilterTab(view.selectedTab);
            self.widgetEventChannel.sendReloadSignal();
        };

        view.event.onReloadWidgetDone = function (errMsg) {
            self.widgetEventChannel.sendReloadCompleteSignal(errMsg);
        };
    };

    BarChartWidgetPresenter.newInstance = function (widgetEventChannel) {
        var _widgetEventChannel = widgetEventChannel || WidgetEventBus.newInstance(widgetName).getOrElse(throwException("Cannot instantiate WidgetEventBus"));
        return Some(new BarChartWidgetPresenter(_widgetEventChannel));
    };

    return BarChartWidgetPresenter;
});