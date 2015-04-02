/**
 * Created by justin on 3/30/15.
 */
app.registerService(function (container) {
    var EventBase = container.getService("services/EventBase");

    function AccountEventBus() {
        EventBase.call(this);
    }

    AccountEventBus.prototype = Object.create(EventBase.prototype, {});

    AccountEventBus.prototype.onTableFieldsLoaded = function () {
    };
    AccountEventBus.prototype.fireTableFieldsLoaded = function () {
    };
    AccountEventBus.prototype.unsubscribeTableFieldsLoaded = function () {
    };

    AccountEventBus.prototype.onEnvironmentToggled = function () {
    };
    AccountEventBus.prototype.fireEnvironmentToggled = function () {
    };
    AccountEventBus.prototype.unsubscribeEnvironmentToggled = function () {
    };

    AccountEventBus.prototype.onViewChanged = function () {
    };
    AccountEventBus.prototype.fireViewChanged = function () {
    };
    AccountEventBus.prototype.unsubscribeViewChanged = function () {
    };

    AccountEventBus.prototype.onAccountTypeToggled = function () {
    };
    AccountEventBus.prototype.fireAccountTypeToggled = function () {
    };
    AccountEventBus.prototype.unsubscribeAccountTypeToggled = function () {
    };

    AccountEventBus.prototype.onOwnerToggled = function () {
    };
    AccountEventBus.prototype.fireOwnerToggled = function () {
    };
    AccountEventBus.prototype.unsubscribeOwnerToggled = function () {
    };

    AccountEventBus.prototype.onQueryChanged = function () {
    };
    AccountEventBus.prototype.fireQueryChanged = function () {
    };
    AccountEventBus.prototype.unsubscribeQueryChanged = function () {
    };

    app._____AccountEventBusInstance = null;

    AccountEventBus.getInstance = function () {
        return app._____AccountEventBusInstance || (app._____AccountEventBusInstance = new AccountEventBus());
    };

    return AccountEventBus;
});