/**
 * Created by justin on 3/30/15.
 */
app.registerService(function (container) {
    var EventBase = container.getService("services/EventBase");

    function AccountEventBus() {
        this.eventList = [
            "TableFieldsLoaded",
            "EnvironmentToggled",
            "ViewChanged",
            "AccountTypeToggled",
            "OwnerToggled",
            "QueryChanged"
        ];
        EventBase.call(this, this.eventList);
    }

    AccountEventBus.prototype = Object.create(EventBase.prototype, {});

    app._____AccountEventBusInstance = null;

    AccountEventBus.getInstance = function () {
        return app._____AccountEventBusInstance || (app._____AccountEventBusInstance = new AccountEventBus());
    };

    return AccountEventBus;
});