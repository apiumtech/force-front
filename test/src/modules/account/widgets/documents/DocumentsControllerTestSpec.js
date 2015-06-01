/**
 * Created by justin on 4/14/15.
 */

define([
    'app',
    'modules/account/widgets/documents/DocumentsWidgetView',
    'modules/account/widgets/documents/DocumentsController'
], function (app, DocumentsWidgetView, DocumentsController) {
    'use strict';
    describe("DocumentsController", function () {

        var appName = app.name;
        beforeEach(module(appName));
        describe("DocumentsController", function () {
            var $controller;
            var scope, $injector;

            beforeEach(inject(function (_$controller_, _$rootScope_, _$injector_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
                $injector = _$injector_;
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('DocumentsController', {
                        $scope: scope, $injector: $injector
                    });
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(DocumentsController, 'configureView');
                }));
                afterEach(function () {
                    DocumentsController.configureView.restore();
                });
                it("should call DocumentsController.configureView global method", function () {
                    new DocumentsController(scope, $injector);
                    expect(DocumentsController.configureView).toHaveBeenCalledWith(scope);
                });
            });


            describe("configureView", function () {
                var view = mock(DocumentsWidgetView);
                beforeEach(function () {
                    sinon.stub(DocumentsWidgetView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    DocumentsWidgetView.newInstance.restore();
                });
                it("should create new instance of DocumentsWidgetView", function () {
                    DocumentsController.configureView(scope);
                    expect(DocumentsWidgetView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });

    });
})