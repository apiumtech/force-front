/**
 * Created by Justin on 3/2/2015.
 */
app.registerService(function () {
    function SignalsService(signal) {
        this.Signal = signal;
    }

    SignalsService.prototype.newSignal = function () {
        return new this.Signal();
    };

    SignalsService.newInstance = function (signal) {
        return Some(new SignalsService(signal || signals.Signal));
    };

    return SignalsService;
});