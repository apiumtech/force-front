define([
    'app'
], function (app) {
    'use strict';

    function DocumentPreviewModel(uploadService) {
    }

    DocumentPreviewModel.contractName = 'documentPreviewModel';

    app.di.register(DocumentPreviewModel.contractName).as(DocumentPreviewModel);

    return DocumentPreviewModel;
});
