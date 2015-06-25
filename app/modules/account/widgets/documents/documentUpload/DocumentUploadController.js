define([
    'app',
    'shared/BaseController',
    'modules/account/widgets/documents/documentUpload/DocumentUploadView'
], function (app, BaseController, DocumentUploadView) {
    'use strict';

    function DocumentUploadController($scope, $upload, $modal, $modalInstance) {
        BaseController.call(this);
        this.configureView($scope, $upload, $modal, $modalInstance);
    }

    DocumentUploadController.inherits(BaseController, {});

    DocumentUploadController.prototype.configureView = function ($scope, $upload, $modal, $modalInstance) {
        this.view = DocumentUploadView._diResolve();
        //this.view.$scope = $scope;
        this.view.modalInstance = $modalInstance;

        this.triggerView(this.view, $scope);
    };

    app.register.controller('DocumentUploadController', ['$scope', '$upload', '$modal', '$modalInstance', DocumentUploadController]);

    return DocumentUploadController;
});