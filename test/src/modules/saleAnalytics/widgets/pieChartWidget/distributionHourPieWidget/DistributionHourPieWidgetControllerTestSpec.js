/**
 * Created by justin on 12/30/14.
 */
define([
    'modules/saleAnalytics/widgets/pieChart/distributionHourPieWidget/DistributionHourPieWidgetController'
], function (DistributionHourPieWidgetController) {
    'use strict';
    describe("DistributionHourPieWidgetController", function () {

        it("should call DistributionHourPieWidgetController.configureView global method", function () {
            var scope = {someScope: true},
                element = {};

            DistributionHourPieWidgetController.configureView = jasmine.createSpy();
            var ctrl = new DistributionHourPieWidgetController(scope, element);
            expect(DistributionHourPieWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });

});