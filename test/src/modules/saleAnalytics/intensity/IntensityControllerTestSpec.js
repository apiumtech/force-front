define([
    'app',
    'modules/saleAnalytics/intensity/IntensityView',
    'modules/saleAnalytics/intensity/IntensityController'
], function (app, IntensityView, IntensityController) {
    'use strict';

    describe("IntensityController", function () {
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
                var ctrl = $controller('IntensityController', {$scope: scope});
                expect(ctrl).not.toBeNull();
                expect(ctrl).not.toBeUndefined();
            });
        });

        describe("construct", function () {
            var scope;
            beforeEach(inject(function () {
                sinon.stub(IntensityController, 'configureView');
            }));
            afterEach(function () {
                IntensityController.configureView.restore();
            });
            it("should call IntensityController.configureView global method", function () {
                new IntensityController(scope);
                expect(IntensityController.configureView).toHaveBeenCalledWith(scope);
            });
        });


        describe("configureView", function () {
            var view = mock(IntensityView);
            beforeEach(function () {
                sinon.stub(IntensityView, 'newInstance').returns(view);
            });
            afterEach(function () {
                IntensityView.newInstance.restore();
            });
            it("should create new instance of IntensityView", function () {
                IntensityController.configureView(scope);
                expect(IntensityView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});