/**
 * Created by justin on 4/15/15.
 */
define([], function () {

    'use strict';

    function DocumentsWidgetPresenter() {
    }

    DocumentsWidgetPresenter.prototype.show = function (view, model) {
        var self = this;
        self.view = view;
        self.model = model;

        view.event.onLoadDocument = function (accountId) {
            model.loadDocumentsData(accountId).
                then(view.onDocumentsLoaded.bind(view), view.showError.bind(view));
        };

        view.event.onSaveDocument = function (record) {
            model.updateDocument(record).
                then(view.onDocumentUpdated.bind(view), view.showError.bind(view));
        };


        view.event.onDeletionConfirmed = function (recordId) {
            model.deleteDocument(recordId).
                then(view.onDocumentDeleted.bind(view), view.showError.bind(view));
        };
    };

    DocumentsWidgetPresenter.prototype.showError = function (error) {

    };

    DocumentsWidgetPresenter.newInstance = function () {
        return new DocumentsWidgetPresenter();
    };

    return DocumentsWidgetPresenter;
});