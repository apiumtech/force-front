/**
 * Created by justin on 16/4/15.
 */
app.registerService(function (container) {
    var EventBase = container.getService("services/EventBase");

    function ScrollEventBus() {
        EventBase.call(this);
    }

    ScrollEventBus.prototype = Object.create(EventBase.prototype, {});

    ScrollEventBus.prototype.fireScrolledToBottom = function () {
    };

    ScrollEventBus.prototype.onScrolledToBottom = function () {
    };

    ScrollEventBus.prototype.unsubscribeScrolledToBottom = function () {
    };

    app.___scrollEventBus = app.___scrollEventBus || null;
    ScrollEventBus.getInstance = function () {
        return app.___scrollEventBus || (app.___scrollEventBus = new ScrollEventBus());
    };

    return ScrollEventBus;
});