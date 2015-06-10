define([
    'app',
    'modules/account/widgets/documents/documentUpload/DocumentUploadModel'
], function (app) {
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

        view.event = view.event || {};

        view.event.onUploadFile = function(file){
            model.uploadFile(file)
                .then(view.onUploadFileSuccess.bind(view))
                .catch(view.onUploadFileError.bind(view));
        };

    };

    app.di.register('documentUploadPresenter').as(DocumentUploadPresenter);

    return DocumentUploadPresenter;
});