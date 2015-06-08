define([
    'app',
    'modules/account/widgets/documents/documentUpload/DocumentUploadView',
    'modules/account/widgets/documents/documentUpload/DocumentUploadPresenter',
    'modules/account/widgets/documents/documentUpload/DocumentUploadModel'
], function (app, DocumentUploadView, DocumentUploadPresenter, DocumentUploadModel) {
    'use strict';

    function DocumentUploadController($scope, $upload, $modalInstance) {
        DocumentUploadController.configureView($scope, $upload, $modalInstance);
    }

    DocumentUploadController.configureView = function ($scope, $upload, $modalInstance) {
        if (!app.di.contains("$uploadService")) {
            app.di.register("$uploadService").instance($upload);
        }

        this.view = app.di.resolve('documentUploadView');
        this.view.$scope = $scope;
        this.view.modalInstance = $modalInstance;

        this.view._injectAspects();
        this.view.show();
    };

    app.register.controller('DocumentUploadController', ['$scope', '$upload', '$modalInstance', DocumentUploadController]);

    return DocumentUploadController;
});