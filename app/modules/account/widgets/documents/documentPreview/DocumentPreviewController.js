define([
    'app',
    'shared/BaseController',
    'modules/account/widgets/documents/documentPreview/DocumentPreviewView'
], function (app, BaseController, DocumentPreviewView) {
    'use strict';

    function DocumentPreviewController($scope, $modal, $modalInstance, document) {
        $scope.document = document;
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

    app.register.controller('DocumentPreviewController', ['$scope', '$modal', '$modalInstance', 'document', DocumentPreviewController]);

    return DocumentPreviewController;
});