/**
 * Created by justin on 3/9/15.
 */
app.registerPresenter(function () {
    function AccountDetailsPresenter() {

    }

    AccountDetailsPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;

        view.event.onLoadAccount = function () {
            model.getAccountDetail(view.accountId)
                .then(view.onAccountLoaded.bind(view), view.showError.bind(view));
        };

        view.event.onToggleFollow = function () {
            model.toggleFollow(view.accountId)
                .then(view.onFollowToggled.bind(view), view.showError.bind(view));
        };

        view.event.onUpdateEmail = function (accountData) {
            model.updateAccountData(view.accountId, accountData)
                .then(view.onAccountUpdated.bind(view), view.showError.bind(view));
        };

        view.event.onRelateContactRequest = function (accountId, callback) {
            model.getAccountSummary(accountId)
                .then(callback.bind(view), view.showError.bind(view));
        };
    };

    AccountDetailsPresenter.newInstance = function () {
        return new AccountDetailsPresenter();
    };

    return AccountDetailsPresenter;
});