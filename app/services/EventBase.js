/**
 * Created by justin on 3/27/15.
 */
app.registerService(function (container) {
    var SignalService = container.getService('services/SignalService');

    function EventBase(events) {
        this.signalService = SignalService.newInstance().getOrElse(throwInstantiateException(SignalService));
        var self = this;
        events.forEach(function (eventName) {
            self[eventName] = self.signalService.newSignal();
            self["on" + eventName] = function (callback) {
                self[eventName].add(callback);
            };

            self["fire" + eventName] = self[eventName].dispatch;

            self["unsubscribe" + eventName] = function () {
                self[eventName].removeAll();
            };
        });
    }

    EventBase.prototype = Object.create(Object.prototype, {});

    return EventBase;
});