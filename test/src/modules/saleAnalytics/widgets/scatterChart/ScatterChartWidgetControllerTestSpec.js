/**
 * Created by justin on 12/30/14.
 */

define([
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetController'
], function (ScatterChartWidgetController) {
    'use strict';
    describe("ScatterChartWidgetController", function () {

        it("should call ScatterChartWidgetController.configureView global method", function () {
            var scope = {someScope: true},
                element = {};

            ScatterChartWidgetController.configureView = jasmine.createSpy();
            var ctrl = new ScatterChartWidgetController(scope, element);
            expect(ScatterChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });
});
