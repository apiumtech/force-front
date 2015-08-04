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

		describe('getParameterConfiguration', function () {
			it("should call getParameterConfiguration from ReportService", function () {
				var reportId = 123;
				var response = {};
				var callback = sinon.stub();
				reportService.getParameterConfiguration.returns(exerciseFakeOkPromiseWithArg(response));
				sut.getParameterConfiguration(reportId, callback);
				expect(callback).toHaveBeenCalledWith(response);
			});
		});

		describe('getReportURL', function () {
			it("should call getReportURL from ReportService", function () {
				var report = {
					Id: 123,
					Name: "report 01"
				};
                spyOn(sut.reportService,"getReportURL");
				sut.getReportURL(report);
				expect(sut.reportService.getReportURL).toHaveBeenCalledWith(report);
			});
		});

	});
});