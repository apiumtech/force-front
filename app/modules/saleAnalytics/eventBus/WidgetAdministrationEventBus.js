define([
    'shared/services/EventBase'
], function(EventBase) {
    'use strict';

    function WidgetAdministrationEventBus() {
        EventBase.call(this);
    }

    WidgetAdministrationEventBus.inherits(EventBase);



    WidgetAdministrationEventBus.prototype.onToggleWidgetAdministration = function (callback) {};
    WidgetAdministrationEventBus.prototype.fireToggleWidgetAdministration = function () {};
    WidgetAdministrationEventBus.prototype.unsubscribeToggleWidgetAdministration = function () {};


    WidgetAdministrationEventBus.getInstance = function () {
        return WidgetAdministrationEventBus.__instance || (WidgetAdministrationEventBus.__instance = new WidgetAdministrationEventBus());
    };

    return WidgetAdministrationEventBus;
});