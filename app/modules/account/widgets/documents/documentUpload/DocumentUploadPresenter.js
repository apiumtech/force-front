define([
    'modules/account/widgets/documents/documentUpload/DocumentUploadModel'
], function (DocumentUploadModel) {
    'use strict';

    function DocumentUploadPresenter(model) {
        this.model = model || new DocumentUploadModel();
    }

    DocumentUploadPresenter.prototype.show = function (view) {
        this.view = view;
        var model = this.model;
    };

    return DocumentUploadPresenter;
});