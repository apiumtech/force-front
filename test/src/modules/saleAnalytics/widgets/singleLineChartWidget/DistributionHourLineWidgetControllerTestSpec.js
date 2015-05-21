/**
 * Created by justin on 12/30/14.
 */

define([
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetController'
], function (DistributionHourLineWidgetController) {
    'use strict';
    describe("DistributionHourLineWidgetController", function () {

        it("should call DistributionHourLineWidgetController.configureView global method", function () {
            var scope = {someScope: true},
                element = {};

            DistributionHourLineWidgetController.configureView = jasmine.createSpy();
            var ctrl = new DistributionHourLineWidgetController(scope, element);
            expect(DistributionHourLineWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });
});
