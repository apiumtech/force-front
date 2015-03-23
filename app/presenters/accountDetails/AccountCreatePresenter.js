/**
 * Created by justin on 3/13/15.
 */

app.registerPresenter(function (container) {

    function AccountCreatePresenter() {

    }

    AccountCreatePresenter.prototype.show = function (view, model) {
        var self = this;

        self.view = view;
        self.model = model;

        view.event.onUploadFile = function (file) {
            model.uploadFile(file)
                .then(view.onUploadComplete.bind(view), view.showError.bind(view));
        };

        view.event.onCreateAccount = function (account) {
            model.createAccount(account)
                .then(view.onAccountCreated.bind(view), view.showError.bind(view));
        };

        view.event.onLoadAccountType = function () {
            model.getAvailableAccountTypes()
                .then(view.onAvailableAccountTypeLoaded.bind(view), view.showError.bind(view));
        };

        view.event.onLoadEnvironments = function () {
            model.getAvailableEnvironments()
                .then(view.onEnvironmentsLoaded.bind(view), view.showError.bind(view));
        };
    };

    AccountCreatePresenter.newInstance = function () {
        return Some(new AccountCreatePresenter());
    };

    return AccountCreatePresenter;
});