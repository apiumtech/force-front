define([
	'modules/saleAnalytics/reports/searchReport/SearchReportController'
], function(SearchReportController) {
	'use strict';

	describe('SearchReportController', function() {
		it("should call SearchReportController.configureView global method", function () {
			var scope = {someScope: true};

			SearchReportController.configureView = jasmine.createSpy();
			var ctrl = new SearchReportController(scope);
			expect(SearchReportController.configureView).toHaveBeenCalledWith(scope);
		});
		
	});
});