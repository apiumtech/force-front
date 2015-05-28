define([
	'shared/services/ajax/FakeAjaxService',
	'modules/saleAnalytics/reports/ReportFakeData'
], function(AjaxService, ReportFakeData) {
	'use strict';

	function SearchReportModel(ajaxService) {
		this.ajaxService = ajaxService || new AjaxService();
	}

	SearchReportModel.prototype._getReports = function () {
		return this.ajaxService.rawAjaxRequest({
			result: ReportFakeData
		}).then(this.decorateServerData.bind(this));
	};

	SearchReportModel.prototype.decorateServerData = function (serverData) {
		return serverData;
	};

	return SearchReportModel;
});