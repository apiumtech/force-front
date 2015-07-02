define([
	'shared/services/ajax/FakeAjaxService',
	'modules/saleAnalytics/reports/ReportService'
], function(AjaxService, ReportService) {
	'use strict';

	function SearchReportModel(ajaxService, reportService) {
		this.authAjaxService = ajaxService || new AjaxService();
		this.reportService = reportService || new ReportService();
	}

	SearchReportModel.prototype._getReports = function (query) {
		return this.reportService.searchReport(query);
	};

	return SearchReportModel;
});