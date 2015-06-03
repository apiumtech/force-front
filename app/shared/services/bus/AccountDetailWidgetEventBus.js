/**
 * Created by Justin on 3/17/2015.
 */
define([
    'shared/services/SignalService'
], function (SignalService) {

    function AccountDetailWidgetEventBus(signalService) {
        this.signalService = signalService;
        this.reloadSignal = this.signalService.newSignal();
        this.reloadCompleteSignal = this.signalService.newSignal();
    }

    AccountDetailWidgetEventBus.inherits(Object, {});

    AccountDetailWidgetEventBus.prototype.onReloadCommandReceived = function (callback) {
        this.reloadSignal.add(callback);
    };

    AccountDetailWidgetEventBus.prototype.sendReloadCommand = function (isReload) {
        this.reloadSignal.dispatch(isReload);
    };

    AccountDetailWidgetEventBus.prototype.unsubscribeReloadCommand = function () {
        this.reloadSignal.removeAll();
    };

    AccountDetailWidgetEventBus.prototype.onReloadCompleteCommandReceived = function (callback) {
        this.reloadCompleteSignal.add(callback);
    };

    AccountDetailWidgetEventBus.prototype.sendReloadCompleteCommand = function () {
        this.reloadCompleteSignal.dispatch.apply(arguments);
    };

    AccountDetailWidgetEventBus.prototype.unsubscribeReloadCompleteCommand = function () {
        this.reloadCompleteSignal.removeAll();
    };

    AccountDetailWidgetEventBus.newInstance = function () {
        var signalService = SignalService.newInstance();
        return new AccountDetailWidgetEventBus(signalService);
    };

    return AccountDetailWidgetEventBus;
});