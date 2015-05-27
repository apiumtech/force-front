define([
	'modules/saleAnalytics/reports/favouriteReport/FavouriteReportView'
], function(FavouriteReportView) {
	'use strict';

	describe('FavouriteReportView', function() {
		describe('construct', function () {
			it("should call configureEvents", function () {
				spyOn(FavouriteReportView.prototype, 'configureEvents').and.callThrough();
				new FavouriteReportView({}, {});
				expect(FavouriteReportView.prototype.configureEvents).toHaveBeenCalled();
			});
		});
	});
});