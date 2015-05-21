/**
 * Created by justin on 2/11/15.
 */
define([
    'modules/saleAnalytics/widgets/mapChart/DistributionGeographicalWidgetController'
], function (DistributionGeographicalWidgetController) {
    'use strict';
    describe("DistributionGeographicalWidgetController", function () {

        it("should call DistributionGeographicalWidgetController.configureView global method", function () {
            var scope = {someScope: true},
                element = {};

            DistributionGeographicalWidgetController.configureView = jasmine.createSpy();
            var ctrl = new DistributionGeographicalWidgetController(scope, element);
            expect(DistributionGeographicalWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });

});