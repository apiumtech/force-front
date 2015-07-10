/**
 * Created by apiumtech on 6/22/2015.
 */
define([
    'app',
    'shared/services/EventBase'
], function (app, EventBase) {

    function WidgetEventBus() {
        EventBase.call(this);
    }

    WidgetEventBus.inherits(EventBase, {});

    WidgetEventBus.prototype.onRemovingWidget = function () {
    };
    WidgetEventBus.prototype.fireRemovingWidget = function () {
    };
    WidgetEventBus.prototype.unsubscribeRemovingWidget = function () {
    };

    app._____WidgetEventBus = app._____WidgetEventBus || null;

    WidgetEventBus.getInstance = function () {
        return app._____WidgetEventBus || (app._____WidgetEventBus = new WidgetEventBus());
    };

    return WidgetEventBus;
});