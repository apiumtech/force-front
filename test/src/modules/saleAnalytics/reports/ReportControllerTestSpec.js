define([
	'modules/saleAnalytics/reports/ReportController'
], function(ReportController) {
	'use strict';

	describe('ReportController', function() {
		it("should call ReportController.configureView global method", function () {
			var scope = {someScope: true};

			ReportController.configureView = jasmine.createSpy();
			var ctrl = new ReportController(scope);
			expect(ReportController.configureView).toHaveBeenCalledWith(scope);
		});
		
	});
});