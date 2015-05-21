/**
 * Created by justin on 12/30/14.
 */
define([
    'modules/saleAnalytics/widgets/pieChart/distributionSegmentPieWidget/DistributionSegmentPieWidgetController'
], function (DistributionSegmentPieWidgetController) {
    'use strict';
    describe("DistributionSegmentPieWidgetController", function () {

        it("should call DistributionSegmentPieWidgetController.configureView global method", function () {
            var scope = {someScope: true},
                element = {};

            DistributionSegmentPieWidgetController.configureView = jasmine.createSpy();
            var ctrl = new DistributionSegmentPieWidgetController(scope, element);
            expect(DistributionSegmentPieWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });

});