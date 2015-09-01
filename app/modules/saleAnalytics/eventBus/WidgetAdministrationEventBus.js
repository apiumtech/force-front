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


    WidgetAdministrationEventBus.prototype.onWidgetsLoaded = function (callback) {};
    WidgetAdministrationEventBus.prototype.fireWidgetsLoaded = function () {};
    WidgetAdministrationEventBus.prototype.unsubscribeWidgetsLoaded = function () {};


    WidgetAdministrationEventBus.prototype.onRequestWidgetsList = function (callback) {};
    WidgetAdministrationEventBus.prototype.fireRequestWidgetsList = function () {};
    WidgetAdministrationEventBus.prototype.unsubscribeRequestWidgetsList = function () {};


    WidgetAdministrationEventBus.prototype.onMoveWidgetToIndex = function (callback) {};
    WidgetAdministrationEventBus.prototype.fireMoveWidgetToIndex = function () {};
    WidgetAdministrationEventBus.prototype.unsubscribeMoveWidgetToIndex = function () {};

    WidgetAdministrationEventBus.prototype.onMoveWidgetLeft = function (callback) {};
    WidgetAdministrationEventBus.prototype.fireMoveWidgetLeft = function () {};
    WidgetAdministrationEventBus.prototype.unsubscribeMoveWidgetLeft = function () {};


    WidgetAdministrationEventBus.prototype.onMoveWidgetRight = function (callback) {};
    WidgetAdministrationEventBus.prototype.fireMoveWidgetRight = function () {};
    WidgetAdministrationEventBus.prototype.unsubscribeMoveWidgetRight = function () {};

    WidgetAdministrationEventBus.prototype.onActivateWidget = function (callback) {};
    WidgetAdministrationEventBus.prototype.fireActivateWidget = function () {};
    WidgetAdministrationEventBus.prototype.unsubscribeActivateWidget = function () {};

    WidgetAdministrationEventBus.prototype.onDeactivateWidget = function (callback) {};
    WidgetAdministrationEventBus.prototype.fireDeactivateWidget = function () {};
    WidgetAdministrationEventBus.prototype.unsubscribeDeactivateWidget = function () {};


    WidgetAdministrationEventBus.getInstance = function () {
        return WidgetAdministrationEventBus.__instance || (WidgetAdministrationEventBus.__instance = new WidgetAdministrationEventBus());
    };

    return WidgetAdministrationEventBus;
});