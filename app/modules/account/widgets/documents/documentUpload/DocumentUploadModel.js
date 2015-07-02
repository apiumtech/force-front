define([
    'app',
    'config'

], function (app, config) {
    'use strict';

    function DocumentUploadModel($uploadService) {
        this.$uploadService = $uploadService;
        this.config = config;
    }

    DocumentUploadModel.prototype.uploadFile = function (file) {
        var self = this;
        return self.$uploadService.upload({
            url: self.config.api.uploadDocuments,
            method: 'POST',
            file: file.fileStream,
            fileName: file.name || file.fileStream.name,
            fields: {
                fileId: file.id
            },
            headers: {
                extract: file.extract
            }
        }).then(function (response) {
            return response;
        });
    };

    return DocumentUploadModel;
});