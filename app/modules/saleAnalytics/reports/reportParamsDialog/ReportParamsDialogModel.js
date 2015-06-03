define([
	'modules/saleAnalytics/reports/ReportService'
], function (ReportService) {
	'use strict';

	function ReportParamsDialogModel(reportService) {
		this.reportService = reportService || new ReportService();
	}

	return ReportParamsDialogModel;
});