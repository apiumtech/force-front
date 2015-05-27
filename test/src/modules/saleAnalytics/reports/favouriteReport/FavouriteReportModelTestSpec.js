define([
	'modules/saleAnalytics/reports/favouriteReport/FavouriteReportModel'
], function(FavouriteReportModel) {
	'use strict';

	describe('FavouriteReportModel', function() {
		var sut, ajaxService;

		beforeEach(function () {
			ajaxService = {
				rawAjaxRequest: function () {
				}
			};
			sut = new FavouriteReportModel(ajaxService);
		});

		describe('_getReports', function () {

			it('should call decoration method to decorate data from server', function (done) {
				spyOn(sut, 'decorateServerData');
				spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
				sut._getReports().then(function () {
					expect(sut.decorateServerData).toHaveBeenCalled();
					done();
				});
			});

		});
	});
});