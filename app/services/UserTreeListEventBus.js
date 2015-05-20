/**
 * Created by justin on 3/30/15.
 */
app.registerService(function (container) {
    var EventBase = container.getService("services/EventBase");

    function UserTreeListEventBus() {
        EventBase.call(this);
    }

    UserTreeListEventBus.prototype = Object.create(EventBase.prototype, {});

    UserTreeListEventBus.prototype.onNodeSelected = function () {
    };
    UserTreeListEventBus.prototype.fireNodeSelected = function () {
    };
    UserTreeListEventBus.prototype.unsubscribeNodeSelected = function () {
    };

    app._____UserTreeListEventBusInstance = app._____UserTreeListEventBusInstance || null;

    UserTreeListEventBus.getInstance = function () {
        return app._____UserTreeListEventBusInstance || (app._____UserTreeListEventBusInstance = new UserTreeListEventBus());
    };

    return UserTreeListEventBus;
});