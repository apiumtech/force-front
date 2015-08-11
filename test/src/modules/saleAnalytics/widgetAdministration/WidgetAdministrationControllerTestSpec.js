define([
    'app',
    'modules/saleAnalytics/widgetAdministration/WidgetAdministrationView',
    'modules/saleAnalytics/widgetAdministration/WidgetAdministrationController'
], function(app, WidgetAdministrationView, WidgetAdministrationController){
    'use strict';

    describe("WidgetAdministrationController", function () {
            var appName = app.name;
            beforeEach(module(appName));

            var $controller;
            var scope;

            beforeEach(inject(function (_$controller_, _$rootScope_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('WidgetAdministrationController', {$scope: scope});
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(WidgetAdministrationController, 'configureView');
                }));
                afterEach(function () {
                    WidgetAdministrationController.configureView.restore();
                });
                it("should call WidgetAdministrationController.configureView global method", function () {
                    new WidgetAdministrationController(scope);
                    expect(WidgetAdministrationController.configureView).toHaveBeenCalledWith(scope);
                });
            });


            describe("configureView", function () {
                var view = mock(WidgetAdministrationView);
                beforeEach(function () {
                    sinon.stub(WidgetAdministrationView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    WidgetAdministrationView.newInstance.restore();
                });
                it("should create new instance of WidgetAdministrationView", function () {
                    WidgetAdministrationController.configureView(scope);
                    expect(WidgetAdministrationView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });
});