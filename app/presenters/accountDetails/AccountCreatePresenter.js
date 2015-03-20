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
    };

    AccountCreatePresenter.newInstance = function () {
        return Some(new AccountCreatePresenter());
    };

    return AccountCreatePresenter;
});