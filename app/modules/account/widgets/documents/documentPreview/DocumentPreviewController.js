define([
    'app',
    'shared/BaseController',
    'modules/account/widgets/documents/documentPreview/DocumentPreviewView'
], function (app, BaseController, DocumentPreviewView) {
    'use strict';

    function DocumentPreviewController($scope, $modal, $modalInstance, documentId) {
        $scope.documentId = documentId;
        this.configureView($scope, $modal, $modalInstance);
    }

    DocumentPreviewController.inherits(BaseController, {});

    DocumentPreviewController.prototype.configureView = function ($scope, $modal, $modalInstance) {
        if (!app.di.contains("modalService")) {
            app.di.register("modalService").instance($modal);
        }

        this.view = app.di.resolve(DocumentPreviewView.contractName);
        this.view.$modalInstance = $modalInstance;
        this.triggerView(this.view, $scope);
    };

    app.register.controller('DocumentPreviewController', ['$scope', '$modal', '$modalInstance', 'documentId', DocumentPreviewController]);

    return DocumentPreviewController;
});