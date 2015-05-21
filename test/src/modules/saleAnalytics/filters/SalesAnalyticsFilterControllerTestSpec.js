/**
 * Created by justin on 2/3/15.
 */
define([
    'modules/saleAnalytics/filters/SalesAnalyticsFilterController'
], function (SalesAnalyticsFilterController) {
    'use strict';
    describe("SalesAnalyticsFilterController", function () {

        it("should call SalesAnalyticsFilterController.configureView global method", function () {
            var scope = {someScope: true},
                filter = {filter: true}, someCompileThings = {};

            SalesAnalyticsFilterController.configureView = jasmine.createSpy();
            var ctrl = new SalesAnalyticsFilterController(scope, filter, someCompileThings);
            expect(SalesAnalyticsFilterController.configureView).toHaveBeenCalledWith(scope, filter, someCompileThings);
        });
    });

});