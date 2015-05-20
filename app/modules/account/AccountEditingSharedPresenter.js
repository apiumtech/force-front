/**
 * Created by justin on 4/10/15.
 */
define([], function () {
    function AccountEditingSharedPresenter() {
        this.view = null;
        this.model = null;
    }

    AccountEditingSharedPresenter.prototype.show = function (view, model) {
        var self = this;
        self.view = view;
        self.model = model;

        view.event.onUploadFile = function (file) {
            model.uploadFile(file)
                .then(view.onUploadComplete.bind(view), view.showError.bind(view));
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

    return AccountEditingSharedPresenter;
});