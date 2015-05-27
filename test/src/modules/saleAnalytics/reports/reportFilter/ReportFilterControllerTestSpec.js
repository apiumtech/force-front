define([
	'modules/saleAnalytics/reports/reportFilter/ReportFilterController'
], function(ReportFilterController) {
	'use strict';

	describe('ReportFilterController', function() {
		it("should call ReportFilterController.configureView global method", function () {
			var scope = {someScope: true};

			ReportFilterController.configureView = jasmine.createSpy();
			var ctrl = new ReportFilterController(scope);
			expect(ReportFilterController.configureView).toHaveBeenCalledWith(scope);
		});
	});
});