/**
 * Created by justin on 12/30/14.
 */
define([
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetController'
], function (GraphChartWidgetController) {
    'use strict';
    describe("GraphChartWidgetController", function () {

        it("should call GraphChartWidgetController.configureView global method", function () {
            var scope = {someScope: true},
                element = {};

            GraphChartWidgetController.configureView = jasmine.createSpy();
            var ctrl = new GraphChartWidgetController(scope, element);
            expect(GraphChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });
});
