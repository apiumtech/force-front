/**
 * Created by justin on 3/13/15.
 */

app.registerPresenter(function (container) {

    function AccountActivityPresenter() {

    }

    AccountActivityPresenter.prototype.show = function (view, model) {
        var self = this;

        self.view = view;
        self.model = model;

        view.event.onLoadActivity = function (accountId, page) {
            model.getActivityForAccount(accountId, page).
                then(view.onActivityLoaded.bind(view), view.showError.bind(view));
        };
    };

    AccountActivityPresenter.newInstance = function () {
        return Some(new AccountActivityPresenter());
    };

    return AccountActivityPresenter;
});