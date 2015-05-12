/**
 * Created by justin on 3/13/15.
 */

app.registerPresenter(function (container) {
    var AccountEditingSharedPresenter = container.getPresenter('presenters/accountDetails/AccountEditingSharedPresenter');

    function AccountCreatePresenter() {
        AccountEditingSharedPresenter.call(this);
    }

    AccountCreatePresenter.prototype = Object.create(AccountEditingSharedPresenter.prototype, {});

    AccountCreatePresenter.prototype.show = function (view, model) {
        AccountEditingSharedPresenter.prototype.show.call(this, view, model);

        view.event.onCreateAccount = function (account) {
            model.createAccount(account)
                .then(view.onAccountCreated.bind(view), view.showError.bind(view));
        };
    };

    AccountCreatePresenter.newInstance = function () {
        return new AccountCreatePresenter();
    };

    return AccountCreatePresenter;
});