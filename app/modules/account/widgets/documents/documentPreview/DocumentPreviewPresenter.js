define([
    'app',
    'modules/account/widgets/documents/documentPreview/DocumentPreviewModel'
], function (app, DocumentPreviewModel) {
    'use strict';

    function DocumentPreviewPresenter(documentPreviewModel) {
        this.model = documentPreviewModel || new DocumentPreviewModel();
    }

    DocumentPreviewPresenter.prototype.show = function (view) {
        var self = this;

        var model = self.model;
    };

    DocumentPreviewPresenter.contractName = 'documentPreviewPresenter';

    app.di.register(DocumentPreviewPresenter.contractName).as(DocumentPreviewPresenter);

    return DocumentPreviewPresenter;
});