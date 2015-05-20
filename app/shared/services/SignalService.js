/**
 * Created by Justin on 3/2/2015.
 */
define([
    'signals'
], function (signals) {

    function SignalsService(signal) {
        this.Signal = signal;
    }

    SignalsService.prototype.newSignal = function () {
        return new this.Signal();
    };

    SignalsService.newInstance = function (signal) {
        return new SignalsService(signal || signals.Signal);
    };

    return SignalsService;
});