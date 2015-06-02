define([
	'shared/services/ajax/AjaxService',
	'modules/saleAnalytics/reports/reportItem/ReportItemModel',
	'modules/saleAnalytics/reports/ReportService'
], function(AjaxService,ReportItemModel, ReportService) {
	'use strict';

	describe('ReportItemModel', function() {

		var sut, reportService, ajaxService;
		beforeEach(function () {
			reportService = mock(ReportService);
			ajaxService = mock(AjaxService);
			sut = new ReportItemModel(ajaxService, reportService);
		});

		describe('toggleFavouriteReport', function () {
			it("should call toggle favourite report from service", function () {
				var reportId = 123;
				sut.toggleFavouriteReport(reportId);
				expect(reportService.toggleFavouriteReport).toHaveBeenCalledWith(123);
			});
		});

	});
});