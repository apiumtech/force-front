define([
	'modules/saleAnalytics/reports/previewDialog/PreviewDialogModel',
	'modules/saleAnalytics/reports/ReportService'
], function(PreviewDialogModel, ReportService) {
	'use strict';

	var sut, reportService;

	beforeEach(function () {
		reportService = mock(ReportService);
		sut = new PreviewDialogModel(reportService);
	});

	describe('PreviewDialogModel', function() {
		describe('toggleFavouriteReport', function () {
			it("should call toggleFavouriteReport from ReportService", function () {
				var reportId = 123;
				sut.toggleFavouriteReport(reportId);
				expect(reportService.toggleFavouriteReport).toHaveBeenCalledWith(reportId);
			});
		});
	});
});