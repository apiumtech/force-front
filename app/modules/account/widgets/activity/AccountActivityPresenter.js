/**
 * Created by justin on 3/13/15.
 */

define([], function () {

    function AccountActivityPresenter() {

    }

    AccountActivityPresenter.prototype.show = function (view, model) {
        var self = this;

        self.view = view;
        self.model = model;

        view.event.onLoadActivity = function (accountId, page) {
            model.getActivityForAccount(accountId, page).
                then(view.onOpportunitiesLoaded.bind(view), view.showError.bind(view))
                .catch(view.showError.bind(view));
        };
    };

    AccountActivityPresenter.newInstance = function () {
        return new AccountActivityPresenter();
    };

    return AccountActivityPresenter;
});