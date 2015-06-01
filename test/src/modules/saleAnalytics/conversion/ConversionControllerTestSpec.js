define([
    'app',
    'modules/saleAnalytics/conversion/ConversionView',
    'modules/saleAnalytics/conversion/ConversionController'
], function (app, ConversionView, ConversionController) {
    'use strict';

    var appName = app.name;
    beforeEach(module(appName));
    describe("ConversionController", function () {
        var $controller;
        var scope;

        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
        }));
        describe("loading asynchronously", function () {
            it("should register the controller to app", function () {
                var ctrl = $controller('ConversionController', {$scope: scope});
                expect(ctrl).not.toBeNull();
                expect(ctrl).not.toBeUndefined();
            });
        });


        describe("construct", function () {
            beforeEach(inject(function () {
                sinon.stub(ConversionController, 'configureView');
            }));
            afterEach(function () {
                ConversionController.configureView.restore();
            });
            it("should call ConversionController.configureView global method", function () {
                new ConversionController(scope);
                expect(ConversionController.configureView).toHaveBeenCalledWith(scope);
            });
        });


        describe("configureView", function () {
            var view = mock(ConversionView);
            beforeEach(function () {
                sinon.stub(ConversionView, 'newInstance').returns(view);
            });
            afterEach(function () {
                ConversionView.newInstance.restore();
            });
            it("should create new instance of ConversionView", function () {
                ConversionController.configureView(scope);
                expect(ConversionView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });
});