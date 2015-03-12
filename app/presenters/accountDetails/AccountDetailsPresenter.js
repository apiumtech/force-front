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
        }
    };

    AccountDetailsPresenter.newInstance = function () {
        return Some(new AccountDetailsPresenter());
    };

    return AccountDetailsPresenter;
});