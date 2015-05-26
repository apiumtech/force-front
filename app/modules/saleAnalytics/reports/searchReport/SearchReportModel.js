define([
	'shared/services/ajax/FakeAjaxService'
], function(AjaxService) {
	'use strict';

	function SearchReportModel(ajaxService) {
		this.ajaxService = ajaxService || new AjaxService();
	}

	return SearchReportModel;
});