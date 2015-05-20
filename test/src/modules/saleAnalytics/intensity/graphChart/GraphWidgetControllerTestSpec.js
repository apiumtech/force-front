/**
 * Created by justin on 12/30/14.
 */
define([
    'modules/saleAnalytics/intensity/graphChart/IntensityGraphWidgetController'
], function (IntensityGraphWidgetController) {
    'use strict';
    describe("IntensityGraphWidgetController", function () {

        it("should call IntensityGraphWidgetController.configureView global method", function () {
            var scope = {someScope: true},
                element = {};

            IntensityGraphWidgetController.configureView = jasmine.createSpy();
            var ctrl = new IntensityGraphWidgetController(scope, element);
            expect(IntensityGraphWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });
});
