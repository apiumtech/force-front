/**
 * Created by justin on 3/30/15.
 */
define([
    'app',
    'shared/services/EventBase'
], function (app, EventBase) {

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

    AccountEventBus.prototype.onFilterValueChanged = function () {
    };
    AccountEventBus.prototype.fireFilterValueChanged = function () {
    };
    AccountEventBus.prototype.unsubscribeFilterValueChanged = function () {
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

    AccountEventBus.prototype.onTableFieldsFilterDeselected = function () {
    };
    AccountEventBus.prototype.fireTableFieldsFilterDeselected = function () {
    };
    AccountEventBus.prototype.unsubscribeTableFieldsFilterDeselected = function () {
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

    app._____AccountEventBusInstance = app._____AccountEventBusInstance || null;

    AccountEventBus.getInstance = function () {
        return app._____AccountEventBusInstance || (app._____AccountEventBusInstance = new AccountEventBus());
    };

    return AccountEventBus;
});