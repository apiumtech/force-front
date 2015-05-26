define([
    'modules/saleAnalytics/reports/reportItem/ReportItemController'
], function (ReportItemController) {
    'use strict';

    describe('ReportItemController', function () {
        it("should call ReportItemController.configureView global method", function () {
            var scope = {someScope: true},
                element = {someElement: true};

            ReportItemController.configureView = jasmine.createSpy();
            var ctrl = new ReportItemController(scope, element);
            expect(ReportItemController.configureView).toHaveBeenCalledWith(scope, element);
        });

    });
});