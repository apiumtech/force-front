define([
	'modules/saleAnalytics/reports/favouriteReport/FavouriteReportController'
], function(FavouriteReportController) {
	'use strict';

	describe('FavouriteReportController', function() {
		it("should call FavouriteReportController.configureView global method", function () {
			var scope = {someScope: true};

			FavouriteReportController.configureView = jasmine.createSpy();
			var ctrl = new FavouriteReportController(scope);
			expect(FavouriteReportController.configureView).toHaveBeenCalledWith(scope);
		});
	});
});