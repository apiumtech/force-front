/**
 * Created by justin on 3/5/15
 */

define([
    'shared/services/bus/FilterChannel',
    'shared/services/AccountEventBus'
], function (FilterChannel, AccountEventBus) {
    function AccountPresenter(filterEventChannel, accountEventBus) {
        this.filterChannel = filterEventChannel;
        this.accountEventBus = accountEventBus;
    }

    AccountPresenter.prototype.show = function (view) {
        this.view = view;
    };

    AccountPresenter.newInstance = function ($filterChannel, accountEventBus) {
        var filterChannel = $filterChannel || FilterChannel.newInstance();
        accountEventBus = accountEventBus || AccountEventBus.getInstance();

        return new AccountPresenter(filterChannel, accountEventBus);
    };

    return AccountPresenter;
});
