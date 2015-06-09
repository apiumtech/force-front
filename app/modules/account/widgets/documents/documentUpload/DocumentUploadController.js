define([
    'app',
    'modules/account/widgets/documents/documentUpload/DocumentUploadView',
    'modules/account/widgets/documents/documentUpload/DocumentUploadPresenter',
    'modules/account/widgets/documents/documentUpload/DocumentUploadModel'
], function (app, DocumentUploadView, DocumentUploadPresenter, DocumentUploadModel) {
    'use strict';

    function DocumentUploadController($scope, $upload, $modal, $modalInstance) {
        DocumentUploadController.configureView($scope, $upload, $modal, $modalInstance);
    }

    DocumentUploadController.configureView = function ($scope, $upload, $modal, $modalInstance) {
        if (!app.di.contains("$uploadService")) {
            app.di.register("$uploadService").instance($upload);
        }
        if (!app.di.contains("modalService")) {
            app.di.register("modalService").instance($modal);
        }

        this.view = app.di.resolve('documentUploadView');
        this.view.$scope = $scope;
        this.view.modalInstance = $modalInstance;

        this.view._injectAspects();
        this.view.show();
    };

    app.register.controller('DocumentUploadController', ['$scope', '$upload', '$modal', '$modalInstance', DocumentUploadController]);

    return DocumentUploadController;
});