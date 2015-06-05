define([
    'app',
    'modules/account/widgets/documents/documentUpload/DocumentUploadView'
], function (app, DocumentUploadView) {
    'use strict';

    function DocumentUploadController($scope, $upload, $modalInstance) {
        DocumentUploadController.configureView($scope, $upload, $modalInstance);
    }

    DocumentUploadController.configureView = function ($scope, $upload, $modalInstance) {
        this.view = new DocumentUploadView($scope, $upload, $modalInstance);
        this.view._injectAspects();
        this.view.show();
    };

    app.register.controller('DocumentUploadController', ['$scope', '$upload', '$modalInstance', DocumentUploadController]);

    return DocumentUploadController;
});