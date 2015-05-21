/**
 * Created by justin on 12/30/14.
 */
define([
    'modules/saleAnalytics/intensity/rankingChart/IntensityRankingWidgetController'
], function (TableWidgetController) {
    'use strict';
    describe("TableWidgetController", function () {

        it("should call TableWidgetController.configureView global method", function () {
            var scope = {someScope: true},
                element = {};

            TableWidgetController.configureView = jasmine.createSpy();
            var ctrl = new TableWidgetController(scope, element);
            expect(TableWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });

});