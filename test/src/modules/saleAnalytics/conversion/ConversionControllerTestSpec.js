define([
    'app',
    'modules/saleAnalytics/conversion/ConversionView'
], function (app, ConversionView) {
    'use strict';

    describe("ConversionController", function () {
        var ConversionController;
        describe("loading asynchronously", function () {
            beforeEach(function (done) {
                sinon.stub(app.register, 'controller');

                require(['modules/saleAnalytics/conversion/ConversionController'], function (DC) {
                    ConversionController = DC;
                    done();
                });
            });
            afterEach(function () {
                app.register.controller.restore();
            });
            it("should register the controller to app", function () {
                expect(app.register.controller).toHaveBeenCalledWith('ConversionController', ['$scope', ConversionController]);
            });
        });


        var scope;
        beforeEach(inject(function (_$rootScope_) {
            scope = _$rootScope_.$new();
        }));
        describe("construct", function () {
            var scope;
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