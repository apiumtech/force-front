/**
 * Created by apium on 5/8/15.
 */
app.registerService(function (container) {
    var SignalService = container.getService('services/SignalService');

    function BaseWidgetEventBus(signalService) {
        this.signalService = signalService;
        this.reloadSignal = this.signalService.newSignal();
        this.reloadCompleteSignal = this.signalService.newSignal();
    }

    BaseWidgetEventBus.prototype = Object.create(Object.prototype, {});

    BaseWidgetEventBus.prototype.onReloadCommandReceived = function (callback) {
        this.reloadSignal.add(callback);
    };

    BaseWidgetEventBus.prototype.sendReloadCommand = function (isReload) {
        this.reloadSignal.dispatch(isReload);
    };

    BaseWidgetEventBus.prototype.unsubscribeReloadCommand = function () {
        this.reloadSignal.removeAll();
    };

    BaseWidgetEventBus.prototype.onReloadCompleteCommandReceived = function (callback) {
        this.reloadCompleteSignal.add(callback);
    };

    BaseWidgetEventBus.prototype.sendReloadCompleteCommand = function (message) {
        this.reloadCompleteSignal.dispatch(message);
    };

    BaseWidgetEventBus.prototype.unsubscribeReloadCompleteCommand = function () {
        this.reloadCompleteSignal.removeAll();
    };

    BaseWidgetEventBus.newInstance = function () {
        var signalService = SignalService.newInstance();
        return new BaseWidgetEventBus(signalService);
    };

    return BaseWidgetEventBus;
});