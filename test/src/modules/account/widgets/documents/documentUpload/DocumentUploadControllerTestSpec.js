define([
    'app',
    'shared/BaseController',
    'modules/account/widgets/documents/documentUpload/DocumentUploadController',
    'modules/account/widgets/documents/documentUpload/DocumentUploadView'
], function (app, BaseController, DocumentUploadController, DocumentUploadView) {
    'use strict';

    describe('DocumentUploadController', function () {
        var appName = app.name;
        beforeEach(module(appName));

        var controller;
        var scope, view;

        beforeEach(function () {
            view = mock(DocumentUploadView);
            inject(function ($controller, $rootScope) {
                controller = $controller;
                scope = $rootScope.$new();
            });
        });

        describe("instantiates class", function () {
            beforeEach(inject(function () {
                sinon.stub(DocumentUploadController.prototype, 'configureView');
            }));
            afterEach(function () {
                DocumentUploadController.prototype.configureView.restore();
            });

            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = controller('DocumentUploadController', {
                        $scope: scope,
                        $modalInstance: {}
                    });
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });

            it("should call DocumentUploadController.configureView global method", function () {
                controller('DocumentUploadController', {
                    $scope: scope,
                    $modalInstance: {}
                });
                expect(DocumentUploadController.prototype.configureView).toHaveBeenCalledWith(scope, {});
            });
        });


        describe("configureView", function () {
            beforeEach(function () {
                spyOn(DocumentUploadView, '_diResolve').and.returnValue(view);
                sinon.stub(BaseController.prototype, 'triggerView');
            });
            afterEach(function () {
                BaseController.prototype.triggerView.restore();
            });

            it("should assign the modal instance to document upload view", function () {
                var sut = new DocumentUploadController(scope, {});
                expect(DocumentUploadView._diResolve).toHaveBeenCalled();
                expect(sut.view).toEqual(view);
                expect(sut.view.modalInstance).toEqual({});
            });

            it("should create new instance of DocumentUploadView", function () {
                var sut = new DocumentUploadController(scope, {});
                expect(DocumentUploadView._diResolve).toHaveBeenCalled();
                expect(sut.view).toEqual(view);
                expect(BaseController.prototype.triggerView).toHaveBeenCalledWith(sut.view, scope);
            });
        });
    });
});