define([
    'modules/account/widgets/documents/documentPreview/DocumentPreviewModel'
], function ( DocumentPreviewModel) {
    'use strict';

    function DocumentPreviewPresenter(documentPreviewModel) {
        this.model = documentPreviewModel || DocumentPreviewModel._diResolve();
    }

    DocumentPreviewPresenter.prototype.show = function (view) {
        var self = this;

        var model = self.model;
    };

    return DocumentPreviewPresenter;
});