define([
    'modules/saleAnalytics/conversion/ConversionController',
    'modules/saleAnalytics/conversion/ConversionView'
], function (ConversionController, ConversionView) {
    'use strict';
    describe("ConversionController", function () {
        var scope;

        beforeEach(inject(function (_$rootScope_) {
            scope = _$rootScope_.$new();
        }));

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