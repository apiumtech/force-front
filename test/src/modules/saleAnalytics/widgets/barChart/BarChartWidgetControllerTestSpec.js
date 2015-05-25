/**
 * Created by justin on 1/28/15.
 */
define([
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetController'
], function (BarChartWidgetController) {
    'use strict';
    describe("BarChartWidgetController", function () {

        it("should call BarChartWidgetController.configureView global method", function () {
            var scope = {someScope: true},
                element = {};

            BarChartWidgetController.configureView = jasmine.createSpy();
            var ctrl = new BarChartWidgetController(scope, element);
            expect(BarChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });

});