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
        this.view = DocumentPreviewView._diResolve();
        this.view.$modalInstance = $modalInstance;
        this.triggerView(this.view, $scope);
    };

    app.register.controller('DocumentPreviewController', ['$scope', '$modal', '$modalInstance', 'document', DocumentPreviewController]);

    return DocumentPreviewController;
});