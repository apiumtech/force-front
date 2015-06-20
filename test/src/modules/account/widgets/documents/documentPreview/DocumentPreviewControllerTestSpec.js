define([
    'app',
    'shared/BaseController',
    'modules/account/widgets/documents/documentPreview/DocumentPreviewView',
    'modules/account/widgets/documents/documentPreview/DocumentPreviewController'
], function (app, BaseController, DocumentPreviewView, DocumentPreviewController) {
    'use strict';

    describe("DocumentPreviewController", function () {
        var appName = app.name;
        beforeEach(module(appName));

        var controller;
        var scope, view, modal, documentId = 1;

        beforeEach(function () {
            view = mock(DocumentPreviewView);
            inject(function ($controller, $rootScope, $modal) {
                controller = $controller;
                modal = $modal;
                scope = $rootScope.$new();
            });
        });

        describe("instantiates class", function () {
            beforeEach(inject(function () {
                sinon.stub(DocumentPreviewController.prototype, 'configureView');
            }));
            afterEach(function () {
                DocumentPreviewController.prototype.configureView.restore();
            });

            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = controller('DocumentPreviewController', {
                        $scope: scope,
                        $modal: modal,
                        $modalInstance: {},
                        documentId: documentId
                    });
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });

            it("should assign documentId to scope", function () {
                controller('DocumentPreviewController', {
                    $scope: scope,
                    $modal: modal,
                    $modalInstance: {},
                    documentId: documentId
                });
                expect(scope.documentId).toEqual(documentId);
            });

            it("should call DocumentPreviewController.configureView global method", function () {
                controller('DocumentPreviewController', {
                    $scope: scope,
                    $modal: modal,
                    $modalInstance: {},
                    documentId: documentId
                });
                expect(DocumentPreviewController.prototype.configureView).toHaveBeenCalledWith(scope, modal, {});
            });
        });


        describe("configureView", function () {
            beforeEach(function () {
                spyOn(app.di, 'resolve').and.returnValue(view);
                sinon.stub(BaseController.prototype, 'triggerView');
            });
            afterEach(function () {
                BaseController.prototype.triggerView.restore();
            });

            it("should create new instance of DocumentPreviewView", function () {
                var sut = new DocumentPreviewController(scope, modal);
                expect(app.di.resolve).toHaveBeenCalledWith('documentPreviewView');
                expect(sut.view).toEqual(view);
                expect(BaseController.prototype.triggerView).toHaveBeenCalledWith(sut.view, scope);
            });
        });
    });
});