/**
 * Created by justin on 12/17/14.
 */
define([
    'modules/saleAnalytics/intensity/IntensityController'
], function (IntensityController) {
    'use strict';
    describe("IntensityController", function () {
        it("should call IntensityController.configureView global method", function () {
            var scope = {someScope: true};

            IntensityController.configureView = jasmine.createSpy();
            var ctrl = new IntensityController(scope);
            expect(IntensityController.configureView).toHaveBeenCalledWith(scope);
        });
    });
});