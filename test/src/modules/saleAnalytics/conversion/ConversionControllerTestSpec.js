define([
    'modules/saleAnalytics/conversion/ConversionController'
], function (ConversionController) {
    'use strict';
    describe("ConversionController", function () {

        var scope = {someScope: true};

        it("should call ConversionController.configureView global method", function () {
            ConversionController.configureView = jasmine.createSpy();
            var ctrl = new ConversionController(scope);
            expect(ConversionController.configureView).toHaveBeenCalledWith(scope);
        });
    });

});