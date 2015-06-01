/**
 * Created by justin on 3/30/15.
 */

define([
    'app',
    'shared/services/EventBase'
], function (app, EventBase) {
    'use strict';

    function UserTreeListEventBus() {
        EventBase.call(this);
    }

    UserTreeListEventBus.inherits(EventBase, {});

    UserTreeListEventBus.prototype.onNodeSelected = function () {
    };
    UserTreeListEventBus.prototype.fireNodeSelected = function () {
    };
    UserTreeListEventBus.prototype.unsubscribeNodeSelected = function () {
    };


    UserTreeListEventBus.getInstance = function () {
        if (UserTreeListEventBus.__instance) {
            return UserTreeListEventBus.__instance;
        }

        return (UserTreeListEventBus.__instance = new UserTreeListEventBus());
    };

    return UserTreeListEventBus;
});