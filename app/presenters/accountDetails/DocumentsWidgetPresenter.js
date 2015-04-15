/**
 * Created by justin on 4/15/15.
 */
app.registerPresenter(function (container) {

    function DocumentsWidgetPresenter() {

    }

    DocumentsWidgetPresenter.prototype.show = function (view, model) {
        var self = this;
        self.view = view;
        self.model = model;

        view.event.onLoadDocument = self.onLoadDocumentsHandler.bind(self);
    };

    DocumentsWidgetPresenter.prototype.onLoadDocumentsHandler = function (accountId) {
        this.model.loadDocumentsData(accountId).
            then(this.view.onDocumentsLoaded.bind(this.view), this.view.showError.bind(this.view));
    };

    DocumentsWidgetPresenter.newInstance = function () {
        return Some(new DocumentsWidgetPresenter());
    };

    return DocumentsWidgetPresenter;
});