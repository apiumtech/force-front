define([
    'app',
    'shared/BaseController',
    'modules/account/widgets/documents/documentUpload/DocumentUploadView'
], function (app, BaseController, DocumentUploadView) {
    'use strict';

    function DocumentUploadController($scope, $modalInstance) {
        BaseController.call(this);
        this.configureView($scope, $modalInstance);
    }

    DocumentUploadController.inherits(BaseController, {});

    DocumentUploadController.prototype.configureView = function ($scope, $modalInstance) {
        this.view = DocumentUploadView._diResolve();
        this.view.modalInstance = $modalInstance;

        this.triggerView(this.view, $scope);
    };

    app.register.controller('DocumentUploadController', ['$scope', '$modalInstance', DocumentUploadController]);

    return DocumentUploadController;
});