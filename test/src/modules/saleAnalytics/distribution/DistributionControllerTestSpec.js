define([
    'modules/saleAnalytics/distribution/DistributionController'
], function (DistributionController) {
    'use strict';
    describe("DistributionController", function () {

        it("should call DistributionController.configureView global method", function () {
            var scope = {someScope: true};

            DistributionController.configureView = jasmine.createSpy();
            var ctrl = new DistributionController(scope);
            expect(DistributionController.configureView).toHaveBeenCalledWith(scope);
        });
    });
});
