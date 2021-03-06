/**
 * Created by justin on 3/27/15.
 */
define([
    'shared/services/SignalService'
], function (SignalService) {

    function EventBase() {
        this.signalService = SignalService.newInstance();
        var self = this;

        var methods = Object.keys(Object.getPrototypeOf(self));

        methods.forEach(function (methodName) {
            if (!isFunction(self[methodName]))
                return;

            if (methodName.match(/^(on)|^(fire)|^(unsubscribe)+/) === null)
                return;

            var eventName = methodName.replace(/^on|^fire|^unsubscribe+/, '');

            if (self[eventName] === undefined) {
                self[eventName] = self.signalService.newSignal();
            }

            if (methodName.match(/^on+/)) {
                self[methodName] = function (callback) {
                    self[eventName].add(callback);
                };
            } else if (methodName.match(/^fire+/)) {
                self[methodName] = self[eventName].dispatch;
            } else if (methodName.match(/^unsubscribe+/)) {
                self[methodName] = function () {
                    self[eventName].removeAll();
                };
            }
        });
    }

    EventBase.inherits(Object, {});

    EventBase.prototype.dispose = function () {
        var self = this;

        var methods = Object.keys(Object.getPrototypeOf(self));

        methods.forEach(function (methodName) {
            if (!isFunction(self[methodName]))
                return;

            if (methodName.match(/^(unsubscribe)+/) === null)
                return;

            self[methodName]();
        });
    };

    return EventBase;
});