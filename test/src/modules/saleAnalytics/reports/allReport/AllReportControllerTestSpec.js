define([
	'modules/saleAnalytics/reports/allReport/AllReportController'
], function(AllReportController) {
	'use strict';

	describe('AllReportController', function() {
		it("should call AllReportController.configureView global method", function () {
			var scope = {someScope: true};

			AllReportController.configureView = jasmine.createSpy();
			var ctrl = new AllReportController(scope);
			expect(AllReportController.configureView).toHaveBeenCalledWith(scope);
		});
	});
});