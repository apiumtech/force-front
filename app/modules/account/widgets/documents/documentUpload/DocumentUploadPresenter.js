define([
    'modules/account/widgets/documents/documentUpload/DocumentUploadModel'
], function (DocumentUploadModel) {
    'use strict';

    function DocumentUploadPresenter(documentUploadModel) {
        this.documentUploadModel = documentUploadModel || DocumentUploadModel._diResolve();
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

    return DocumentUploadPresenter;
});