/**
 * Created by justin on 2/11/15.
 */
define([
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetController'
], function (MapChartWidgetController) {
    'use strict';
    describe("MapChartWidgetController", function () {

        it("should call MapChartWidgetController.configureView global method", function () {
            var scope = {someScope: true},
                element = {};

            MapChartWidgetController.configureView = jasmine.createSpy();
            var ctrl = new MapChartWidgetController(scope, element);
            expect(MapChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });

});