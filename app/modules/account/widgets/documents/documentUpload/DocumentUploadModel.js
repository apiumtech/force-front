define([
    'app'
], function (app) {
    'use strict';

    function DocumentUploadModel($uploadService) {
        this.$uploadService = $uploadService;
    }

    app.di.register("documentUploadModel").as(DocumentUploadModel);

    return DocumentUploadModel;
});