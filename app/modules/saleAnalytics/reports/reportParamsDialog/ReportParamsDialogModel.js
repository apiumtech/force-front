define([
	'modules/saleAnalytics/reports/ReportService'
], function (ReportService) {
	'use strict';

	function ReportParamsDialogModel(reportService) {
		this.reportService = reportService || new ReportService();
	}

    ReportParamsDialogModel.prototype.getReportListOfValues = function(list){
        return this.reportService.getReportListOfValues(list);
    };

	return ReportParamsDialogModel;
});