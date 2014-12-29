/**
 * Created by justin on 12/22/14.
 */

app.registerPresenter(function (container) {
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
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

        self.widgetEventChannel.onMoveSignalReceived(function (oldPosition, newPosition, moveEvent) {
            self._executeMoveWidget(oldPosition, newPosition, moveEvent);
        });
    };

    GraphWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            $model = self.$model;

        $model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    GraphWidgetPresenter.prototype._executeMoveWidget = function (oldPosition, newPosition, moveEvent) {
        var self = this,
            $view = self.$view,
            $model = self.$model,
            $moveEvent = moveEvent;

        // TODO: this will work synchronously, but with async it doesn't. how can we revert the sorting when ajax fails?
        $moveEvent.preventDefault();

        setTimeout(function () {
            $moveEvent.preventDefault();
        }, 1000);
    };

    GraphWidgetPresenter.prototype.showError = function (error) {
        console.log(error);
        alert("An error has occurred. Please check the log");
    };

    GraphWidgetPresenter.prototype.show = function (view, model) {
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

    GraphWidgetPresenter.newInstance = function (widgetEventChannel) {
        var _widgetEventChannel = widgetEventChannel || WidgetEventBus.newInstance(widgetName).getOrElse(throwException("Cannot instantiate WidgetEventBus"));
        return Some(new GraphWidgetPresenter(_widgetEventChannel));
    };

    return GraphWidgetPresenter;
});