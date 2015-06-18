/**
 * Created by justin on 3/30/15.
 */
define([
    'app',
    'shared/services/EventBase'
], function (app, EventBase) {

    function SaleAnalyticEventBus() {
        EventBase.call(this);
    }

    SaleAnalyticEventBus.inherits(EventBase, {});

    SaleAnalyticEventBus.prototype.onRemovingWidget = function () {
    };
    SaleAnalyticEventBus.prototype.fireRemovingWidget = function () {
    };
    SaleAnalyticEventBus.prototype.unsubscribeRemovingWidget = function () {
    };

    app._____SaleAnalyticEventBus = app._____SaleAnalyticEventBus || null;

    SaleAnalyticEventBus.getInstance = function () {
        return app._____SaleAnalyticEventBus || (app._____SaleAnalyticEventBus = new SaleAnalyticEventBus());
    };

    return SaleAnalyticEventBus;
});