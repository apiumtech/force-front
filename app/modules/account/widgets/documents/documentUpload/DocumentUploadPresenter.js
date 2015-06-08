define([
    'app',
    'modules/account/widgets/documents/documentUpload/DocumentUploadModel'
], function (app, DocumentUploadModel) {
    'use strict';

    function DocumentUploadPresenter(model) {
        this.documentUploadModel = model;
    }

    DocumentUploadPresenter.inherits(Object, {
        model: {
            get: function () {
                return this.documentUploadModel;
            },
            set: function (value) {
                this.documentUploadModel = value;
            }
        }
    });

    DocumentUploadPresenter.prototype.show = function (view) {
        this.view = view;
        var model = this.model;
    };

    app.di.register('documentUploadPresenter').as(DocumentUploadPresenter);

    return DocumentUploadPresenter;
});