define([
	'shared/services/ajax/FakeAjaxService'
], function(AjaxService) {
	'use strict';

	function ReportService(ajaxService) {
		this.ajaxService = ajaxService || new AjaxService();
	}

	ReportService.inherits(Object, {});

	ReportService.prototype.toggleFavouriteReport = function(){
		//TODO: implement when having server's contract
	};

	ReportService.prototype.getReportURL = function(report){
		//TODO: implement when having server's contract
		return this.ajaxService.rawAjaxRequest({
			result: {
				url: "http://this.is/theURL/we/want"

			}
		});
	};

	ReportService.prototype.getReportParametersConf = function (reportId) {
		//TODO: implement when having server's contract
	};

	ReportService.prototype.getPreviewReportPhotos = function (reportId) {
		//TODO: implement when having server's contract
	};

	return ReportService;
});