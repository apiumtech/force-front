define([
    'app',
    'modules/account/widgets/documents/documentPreview/DocumentPreviewModel'
], function (app, DocumentPreviewModel) {
    'use strict';

    function DocumentPreviewPresenter(documentPreviewModel) {
        this.model = documentPreviewModel || DocumentPreviewModel();
    }

    DocumentPreviewPresenter.prototype.show = function (view) {
        var self = this;

        var model = self.model;
    };

    return DocumentPreviewPresenter;
});