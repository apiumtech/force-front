/**
 * Created by justin on 3/13/15.
 */

define([
    'modules/account/AccountEditingSharedPresenter'
], function (AccountEditingSharedPresenter) {

    function AccountEditPresenter() {
        AccountEditingSharedPresenter.call(this);
    }

    AccountEditPresenter.inherits(AccountEditingSharedPresenter, {});

    AccountEditPresenter.prototype.show = function (view, model) {
        AccountEditingSharedPresenter.prototype.show.call(this, view, model);

        view.event.onLoadAccount = function (accountId) {
            model.getAccount(accountId)
                .then(view.onAccountLoaded.bind(view), view.showError.bind(view));
        };

        view.event.onSubmitEditAccount = function (accountId, account) {
            model.updateAccount(accountId, account)
                .then(view.onAccountUpdated.bind(view), view.showError.bind(view));
        };
    };

    AccountEditPresenter.newInstance = function () {
        return new AccountEditPresenter();
    };

    return AccountEditPresenter;
});