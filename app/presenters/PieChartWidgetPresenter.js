/**
 * Created by justin on 1/26/15.
 */

app.registerPresenter(function (container) {
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var widgetName = "intensityWidgetA";

    function PieChartWidgetPresenter(widgetEventChannel) {
        this.widgetEventChannel = widgetEventChannel;
    }

    PieChartWidgetPresenter.prototype = Object.create(Object.prototype, {
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

    PieChartWidgetPresenter.prototype.rebindChannelListener = function () {
        var self = this;
        self.widgetEventChannel.onReloadSignalReceived(function () {
            self._executeLoadWidget();
        });

        self.widgetEventChannel.onMoveSignalReceived(function (oldPosition, newPosition, moveEvent) {
            self._executeMoveWidget(oldPosition, newPosition, moveEvent);
        });
    };

    PieChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            $model = self.$model;

        $model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    PieChartWidgetPresenter.prototype._executeMoveWidget = function (oldPosition, newPosition, moveEvent) {
        var self = this,
            $view = self.$view,
            $model = self.$model,
            $moveEvent = moveEvent;

        $model.moveWidget(oldPosition, newPosition)
            .then($view.onMoveWidgetSuccess.bind($view), $view.onMoveWidgetError.bind($view));
    };

    PieChartWidgetPresenter.prototype.showError = function (error) {

    };

    PieChartWidgetPresenter.prototype.show = function (view, model) {
        var self = this;
        self.$view = view;
        self.$model = model;

        self.rebindChannelListener();

        view.event.onReloadWidgetStart = function () {
            view.data = null;
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

    PieChartWidgetPresenter.newInstance = function (widgetEventChannel) {
        var _widgetEventChannel = widgetEventChannel || WidgetEventBus.newInstance(widgetName).getOrElse(throwException("Cannot instantiate WidgetEventBus"));
        return Some(new PieChartWidgetPresenter(_widgetEventChannel));
    };

    return PieChartWidgetPresenter;
});