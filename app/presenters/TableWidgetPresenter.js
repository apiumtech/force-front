/**
 * Created by justin on 12/22/14.
 */

app.registerPresenter(function (container) {
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var widgetName = "tableWidget";

    function TableWidgetPresenter(widgetEventChannel) {
        this.widgetEventChannel = widgetEventChannel;
    }

    TableWidgetPresenter.prototype = Object.create(Object.prototype, {
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

    TableWidgetPresenter.prototype.rebindChannelListener = function () {
        var self = this;
        self.widgetEventChannel.onReloadSignalReceived(function () {
            self._executeLoadWidget();
        });

        self.widgetEventChannel.onMoveSignalReceived(function (oldPosition, newPosition, moveEvent) {
            self._executeMoveWidget(oldPosition, newPosition, moveEvent);
        });
    };

    TableWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            $model = self.$model;

        $model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    TableWidgetPresenter.prototype._executeMoveWidget = function (oldPosition, newPosition, moveEvent) {
        var self = this,
            $view = self.$view,
            $model = self.$model,
            $moveEvent = moveEvent;

        $model.moveWidget(oldPosition, newPosition)
            .then($view.onMoveWidgetSuccess.bind($view), $view.onMoveWidgetError.bind($view));
    };

    TableWidgetPresenter.prototype.showError = function (error) {
        console.log(error);
    };

    TableWidgetPresenter.prototype.show = function (view, model) {
        var self = this;
        self.$view = view;
        self.$model = model;

        self.rebindChannelListener();

        view.event.onReloadWidgetStart = function () {
            self._executeLoadWidget();
        };

        view.event.onReloadWidgetDone = function (errMsg) {
            self.widgetEventChannel.sendReloadCompleteSignal(errMsg);
        };
    };

    TableWidgetPresenter.newInstance = function (widgetEventChannel) {
        var _widgetEventChannel = widgetEventChannel || WidgetEventBus.newInstance(widgetName).getOrElse(throwException("Cannot instantiate WidgetEventBus"));
        return Some(new TableWidgetPresenter(_widgetEventChannel));
    };

    return TableWidgetPresenter;
});